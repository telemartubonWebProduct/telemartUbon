#!/usr/bin/env bash
# Applies supabase/migrations to the Telemart Ubon dev project, and only that project.
#
#   SUPABASE_ACCESS_TOKEN=... scripts/supabase/push-dev.sh            # verify target + dry run
#   SUPABASE_ACCESS_TOKEN=... scripts/supabase/push-dev.sh --apply    # verify, dry run, confirm, push
#
# Before anything touches a database it confirms, through the Management API, that the
# project ref is the dev project and that it belongs to the telemart-ubon organization.
# Projects in any other organization (including truefiberhome) are refused.
# The database password is prompted by `supabase link` unless SUPABASE_DB_PASSWORD is set.
# Never paste tokens or passwords into this file or into committed configuration.
set -euo pipefail

readonly EXPECTED_REF='wdcbbjvxrcxuaabcipqo'
readonly EXPECTED_ORG='pfvlbpujcoqiqziehstu'
readonly MANAGEMENT_API='https://api.supabase.com/v1'

apply=false
case "${1:-}" in
  '') ;;
  --apply) apply=true ;;
  *) echo "Usage: $0 [--apply]" >&2; exit 2 ;;
esac

cd "$(git rev-parse --show-toplevel)"

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]]; then
  echo 'Set SUPABASE_ACCESS_TOKEN to a personal access token of an account in the telemart-ubon organization.' >&2
  exit 1
fi

echo "Checking project ${EXPECTED_REF} through the Management API..."
project_json="$(curl --fail --silent --show-error \
  --header "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
  "${MANAGEMENT_API}/projects/${EXPECTED_REF}")"

read -r actual_ref actual_org project_status < <(
  PROJECT_JSON="$project_json" node -e '
    const p = JSON.parse(process.env.PROJECT_JSON);
    const org = p.organization_id ?? p.organization_slug ?? "";
    console.log([p.ref ?? p.id ?? "", org, p.status ?? ""].join(" "));
  '
)

if [[ "$actual_ref" != "$EXPECTED_REF" ]]; then
  echo "Refusing: Management API returned project '${actual_ref}', expected '${EXPECTED_REF}'." >&2
  exit 1
fi
if [[ "$actual_org" != "$EXPECTED_ORG" ]]; then
  echo "Refusing: project ${EXPECTED_REF} belongs to organization '${actual_org}', expected '${EXPECTED_ORG}' (telemart-ubon)." >&2
  exit 1
fi
echo "Target verified: ref=${actual_ref} organization=${actual_org} status=${project_status}"

npx --no-install supabase link --project-ref "$EXPECTED_REF"

linked_ref="$(tr -d '[:space:]' < supabase/.temp/project-ref)"
if [[ "$linked_ref" != "$EXPECTED_REF" ]]; then
  echo "Refusing: supabase/.temp/project-ref is '${linked_ref}', expected '${EXPECTED_REF}'." >&2
  exit 1
fi

echo 'Pending migrations (dry run):'
npx --no-install supabase db push --linked --dry-run

if [[ "$apply" != true ]]; then
  echo 'Dry run only. Re-run with --apply to push these migrations.'
  exit 0
fi

read -r -p "Type the project ref (${EXPECTED_REF}) to apply these migrations: " answer
if [[ "$answer" != "$EXPECTED_REF" ]]; then
  echo 'Cancelled; nothing was applied.'
  exit 1
fi

npx --no-install supabase db push --linked
npx --no-install supabase migration list --linked
