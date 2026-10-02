// Shared by the scripts that reach the Telemart Ubon dev project (push-dev.mjs, backup.mjs):
// the personal access token, the check that the target is the dev project in the telemart-ubon
// organization, and a Supabase CLI runner that cannot be pointed at another project.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEV_ORGANIZATION_ID, DEV_PROJECT_REF, devTargetProblem } from "./dev-target.mjs";

const MANAGEMENT_API = "https://api.supabase.com/v1";
// Variables the Supabase CLI reads to pick another project, database, API host or folder.
const TARGET_OVERRIDES = [
  "SUPABASE_PROJECT_ID",
  "SUPABASE_DB_URL",
  "SUPABASE_API_URL",
  "SUPABASE_DASHBOARD_URL",
  "SUPABASE_PROFILE",
  "SUPABASE_WORKDIR",
];

export const root = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));

export class Stop extends Error {
  constructor(message, exitCode) {
    super(message);
    this.exitCode = exitCode;
  }
}

export function fail(message, exitCode = 1) {
  throw new Stop(message, exitCode);
}

export function readAccessToken() {
  // cmd keeps quotes and trailing spaces in `set NAME="value" `, so strip both.
  const token = (process.env.SUPABASE_ACCESS_TOKEN ?? "").trim().replace(/^(["'])(.*)\1$/, "$2");
  if (!token) {
    fail(
      [
        "SUPABASE_ACCESS_TOKEN is not set in this terminal.",
        "Create a personal access token at https://supabase.com/dashboard/account/tokens with an",
        "account in the telemart-ubon organization, then set it for this terminal only:",
        "  cmd:         set SUPABASE_ACCESS_TOKEN=sbp_...",
        '  PowerShell:  $env:SUPABASE_ACCESS_TOKEN = "sbp_..."',
        "  bash:        export SUPABASE_ACCESS_TOKEN=sbp_...",
        "Do not put it in .env.local.",
      ].join("\n"),
    );
  }
  if (!token.startsWith("sbp_")) {
    fail(
      "SUPABASE_ACCESS_TOKEN must be a personal access token (it starts with sbp_), not a project " +
        "API key. Create one at https://supabase.com/dashboard/account/tokens.",
    );
  }
  return token;
}

/** The environment for the CLI: the token, and none of the variables that would retarget it. */
export function cliEnvironment(token) {
  const env = { ...process.env };
  if (token) env.SUPABASE_ACCESS_TOKEN = token;
  const ignored = TARGET_OVERRIDES.filter((name) => env[name] !== undefined);
  for (const name of ignored) delete env[name];
  if (ignored.length > 0) console.log(`Ignoring ${ignored.join(", ")}: the target is fixed to ${DEV_PROJECT_REF}.`);
  return env;
}

/** Runs the Supabase CLI from node_modules with the given workdir; stops on the first failure. */
export function supabaseCli(env, workdir = root) {
  const packageDir = path.join(root, "node_modules", "supabase");
  if (!existsSync(path.join(packageDir, "package.json"))) fail("Supabase CLI is not installed. Run npm ci first.");
  const { bin } = JSON.parse(readFileSync(path.join(packageDir, "package.json"), "utf8"));
  const entry = path.join(packageDir, typeof bin === "string" ? bin : bin.supabase);

  return (...args) => {
    // Run the CLI's Node entry directly: no shell, so cmd, PowerShell and bash behave the same.
    const result = spawnSync(process.execPath, [entry, ...args, "--workdir", workdir], {
      cwd: root,
      env,
      stdio: "inherit",
    });
    if (result.error) fail(`Could not start the Supabase CLI: ${result.error.message}`);
    if (result.status !== 0) {
      fail(`supabase ${args.join(" ")} failed (${result.signal ?? `exit ${result.status}`}); nothing further was run.`);
    }
  };
}

async function fetchProject(token) {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), 30_000);
  let status;
  let body;
  try {
    const response = await fetch(`${MANAGEMENT_API}/projects/${DEV_PROJECT_REF}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: timeout.signal,
    });
    status = response.status;
    // Always read the body so the connection is released before the script exits.
    body = await response.text();
  } catch (error) {
    fail(`Could not reach the Supabase Management API: ${error instanceof Error ? error.message : error}`);
  } finally {
    clearTimeout(timer);
  }

  if (status === 401) fail("The Management API rejected SUPABASE_ACCESS_TOKEN (invalid or expired).");
  if (status < 200 || status > 299) {
    fail(
      `The Management API returned HTTP ${status} for project ${DEV_PROJECT_REF}. ` +
        "Use a token from an account that belongs to the telemart-ubon organization.",
    );
  }
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

/** Confirms through the Management API that the target is the dev project, and that it is running. */
export async function verifyDevProject(token) {
  console.log(`Checking project ${DEV_PROJECT_REF} through the Management API...`);
  const project = await fetchProject(token);
  const problem = devTargetProblem(project);
  if (problem) fail(`Refusing: ${problem}.`);
  if (project.status === "INACTIVE") fail(`Project ${DEV_PROJECT_REF} is paused. Restore it in the Supabase dashboard first.`);
  console.log(`Target verified: ref=${DEV_PROJECT_REF} organization=${DEV_ORGANIZATION_ID} status=${project.status ?? "unknown"}`);
  return project;
}

/** Links the CLI to the dev project and checks the link it wrote. */
export function linkDevProject(supabase) {
  supabase("link", "--project-ref", DEV_PROJECT_REF);
  const linkedRefFile = path.join(root, "supabase", ".temp", "project-ref");
  const linkedRef = existsSync(linkedRefFile) ? readFileSync(linkedRefFile, "utf8").trim() : "";
  if (linkedRef !== DEV_PROJECT_REF) {
    fail(`Refusing: supabase/.temp/project-ref is '${linkedRef}', expected '${DEV_PROJECT_REF}'.`);
  }
}

/** Runs main and leaves through process.exitCode: on Windows, Node 24 can abort when process.exit() runs after fetch(). */
export async function run(main) {
  try {
    await main();
  } catch (error) {
    console.error(error instanceof Stop ? error.message : error);
    process.exitCode = error instanceof Stop ? error.exitCode : 1;
  }
}
