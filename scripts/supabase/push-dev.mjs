#!/usr/bin/env node
// Applies supabase/migrations to the Telemart Ubon dev project, and only that project.
//
//   npm run db:push:dev          verify the target, then show pending migrations (dry run)
//   npm run db:push:dev:apply    verify, dry run, confirm by typing the ref, then push
//
// Runs the same way from cmd, PowerShell, bash and CI. Before anything touches a database it
// confirms, through the Management API, that the project ref is the dev project and that it
// belongs to the telemart-ubon organization; any other project (including truefiberhome) is
// refused. Set SUPABASE_ACCESS_TOKEN in the terminal for this run only:
//
//   cmd:         set SUPABASE_ACCESS_TOKEN=sbp_...
//   PowerShell:  $env:SUPABASE_ACCESS_TOKEN = "sbp_..."
//   bash:        export SUPABASE_ACCESS_TOKEN=sbp_...
//
// Never put the token in .env.local or any committed file. Without SUPABASE_DB_PASSWORD the
// Supabase CLI signs in to the database with a temporary login role created from the token.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
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

const root = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));

class Stop extends Error {
  constructor(message, exitCode) {
    super(message);
    this.exitCode = exitCode;
  }
}

function fail(message, exitCode = 1) {
  throw new Stop(message, exitCode);
}

function parseArgs(args) {
  if (args.length === 0) return { apply: false };
  if (args.length === 1 && args[0] === "--apply") return { apply: true };
  fail("Usage: npm run db:push:dev  |  npm run db:push:dev:apply", 2);
}

function readAccessToken() {
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

function cliEnvironment(token) {
  const env = { ...process.env, SUPABASE_ACCESS_TOKEN: token };
  const ignored = TARGET_OVERRIDES.filter((name) => env[name] !== undefined);
  for (const name of ignored) delete env[name];
  if (ignored.length > 0) console.log(`Ignoring ${ignored.join(", ")}: the target is fixed to ${DEV_PROJECT_REF}.`);
  return env;
}

function supabaseCli(env) {
  const packageDir = path.join(root, "node_modules", "supabase");
  if (!existsSync(path.join(packageDir, "package.json"))) fail("Supabase CLI is not installed. Run npm ci first.");
  const { bin } = JSON.parse(readFileSync(path.join(packageDir, "package.json"), "utf8"));
  const entry = path.join(packageDir, typeof bin === "string" ? bin : bin.supabase);

  return (...args) => {
    // Run the CLI's Node entry directly: no shell, so cmd, PowerShell and bash behave the same.
    const result = spawnSync(process.execPath, [entry, ...args, "--workdir", root], {
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

function ask(question) {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    let answered = false;
    readline.once("close", () => {
      if (answered) return;
      process.stdout.write("\n");
      resolve("");
    });
    readline.question(question, (answer) => {
      answered = true;
      resolve(answer.trim());
      readline.close();
    });
  });
}

async function main() {
  const { apply } = parseArgs(process.argv.slice(2));
  const token = readAccessToken();

  console.log(`Checking project ${DEV_PROJECT_REF} through the Management API...`);
  const project = await fetchProject(token);
  const problem = devTargetProblem(project);
  if (problem) fail(`Refusing: ${problem}.`);
  if (project.status === "INACTIVE") fail(`Project ${DEV_PROJECT_REF} is paused. Restore it in the Supabase dashboard first.`);
  console.log(`Target verified: ref=${DEV_PROJECT_REF} organization=${DEV_ORGANIZATION_ID} status=${project.status ?? "unknown"}`);

  const supabase = supabaseCli(cliEnvironment(token));
  supabase("link", "--project-ref", DEV_PROJECT_REF);

  const linkedRefFile = path.join(root, "supabase", ".temp", "project-ref");
  const linkedRef = existsSync(linkedRefFile) ? readFileSync(linkedRefFile, "utf8").trim() : "";
  if (linkedRef !== DEV_PROJECT_REF) {
    fail(`Refusing: supabase/.temp/project-ref is '${linkedRef}', expected '${DEV_PROJECT_REF}'.`);
  }

  console.log("Pending migrations (dry run):");
  supabase("db", "push", "--linked", "--skip-vault", "--dry-run");

  if (!apply) {
    console.log("Dry run only; nothing was applied. To push these migrations run: npm run db:push:dev:apply");
    return;
  }

  const answer = await ask(`Type the project ref (${DEV_PROJECT_REF}) to apply these migrations: `);
  if (answer !== DEV_PROJECT_REF) fail("Cancelled; nothing was applied.");

  supabase("db", "push", "--linked", "--skip-vault", "--yes");
  supabase("migration", "list", "--linked");
}

// Leave through process.exitCode, never process.exit(): on Windows, Node 24 can abort with
// "Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)" when process.exit() runs after fetch().
try {
  await main();
} catch (error) {
  console.error(error instanceof Stop ? error.message : error);
  process.exitCode = error instanceof Stop ? error.exitCode : 1;
}
