#!/usr/bin/env bash
set -euo pipefail

# Claude Cloud setup runs on Linux. This script installs an exact Node release
# from the official Node.js distribution and the repository's locked packages.
task_repo_dir="${CLAUDE_PROJECT_DIR:-$PWD}"
cd "$task_repo_dir"

if [[ ! -f package.json || ! -f package-lock.json || ! -f .nvmrc ]]; then
  echo 'Telemart setup: run from the repository root with package.json, package-lock.json and .nvmrc.' >&2
  exit 1
fi
if [[ "$(uname -s)" != 'Linux' ]]; then
  echo 'Telemart setup: this Bash script is for the Linux cloud environment.' >&2
  exit 1
fi

task_node_version="$(tr -d '\r\n' < .nvmrc)"
if [[ ! "$task_node_version" =~ ^24\.[0-9]+\.[0-9]+$ ]]; then
  echo 'Telemart setup: .nvmrc must pin an exact Node 24 release.' >&2
  exit 1
fi

case "$(uname -m)" in
  x86_64) task_node_arch='x64' ;;
  aarch64) task_node_arch='arm64' ;;
  *) echo 'Telemart setup: unsupported Linux architecture.' >&2; exit 1 ;;
esac

if ! command -v curl >/dev/null 2>&1 || ! command -v xz >/dev/null 2>&1; then
  apt-get update -qq
  apt-get install -y --no-install-recommends curl xz-utils ca-certificates
fi

task_node_archive="node-v${task_node_version}-linux-${task_node_arch}.tar.xz"
task_node_root="/opt/telemart-cloud"
task_node_dir="${task_node_root}/node-v${task_node_version}-linux-${task_node_arch}"
task_dist_url="https://nodejs.org/dist/v${task_node_version}"

if [[ ! -x "${task_node_dir}/bin/node" ]]; then
  mkdir -p "$task_node_root"
  curl --fail --location --silent --show-error --retry 2 \
    "${task_dist_url}/${task_node_archive}" \
    --output "${task_node_root}/${task_node_archive}"
  curl --fail --location --silent --show-error --retry 2 \
    "${task_dist_url}/SHASUMS256.txt" \
    --output "${task_node_root}/SHASUMS256.txt"
  task_expected_sum="$(awk -v archive="$task_node_archive" '$2 == archive { print $1 }' "${task_node_root}/SHASUMS256.txt")"
  if [[ ! "$task_expected_sum" =~ ^[0-9a-f]{64}$ ]]; then
    echo 'Telemart setup: missing official Node.js checksum.' >&2
    exit 1
  fi
  printf '%s  %s\n' "$task_expected_sum" "${task_node_root}/${task_node_archive}" | sha256sum --check --status
  tar -xJf "${task_node_root}/${task_node_archive}" -C "$task_node_root"
fi

export PATH="${task_node_dir}/bin:${PATH}"
if [[ "$(node --version)" != "v${task_node_version}" ]]; then
  echo 'Telemart setup: Node version does not match .nvmrc.' >&2
  exit 1
fi

npm ci --include=dev --no-fund --no-audit
sha256sum package-lock.json | awk '{print $1}' > node_modules/.telemart-lock.sha
node --version
npm --version
