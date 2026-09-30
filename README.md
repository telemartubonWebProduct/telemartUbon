# Telemart Ubon website

Next.js App Router site for Telemart Ubon: the public promotion pages (home internet, mobile
packages, W&W Energy solar) and an invite-only back office on Supabase. The renovation plan, decisions and
milestone reports live in [`docs/renovation/`](docs/renovation/) — start with
[`DEV-HANDOFF.md`](docs/renovation/DEV-HANDOFF.md) and [`M1-FOUNDATION.md`](docs/renovation/M1-FOUNDATION.md).

## Requirements

- Node.js 24.18.0 (`.nvmrc`); `package-lock.json` is authoritative, install with `npm ci`.
- Docker, only for the local Supabase stack (database, RLS and end-to-end auth tests).
- Bash (Linux, macOS, WSL or Git Bash), only for `npm run test:e2e:local` and `scripts/supabase/local-env.sh`.
  Everything else, including `npm run db:push:dev`, also runs from Windows cmd or PowerShell.

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run lint` | ESLint CLI (flat config from `eslint-config-next`) |
| `npm run typecheck` | Generates route types, then `tsc --noEmit` |
| `npm test` | Vitest unit tests (`tests/unit`) |
| `npm run build` / `npm start` | Production build / server |
| `npm run test:e2e` | Playwright against an existing build (public URL smoke tests; auth tests skip without the local stack) |

## Back office and Supabase

The back office lives under `/admin` (sign-in, password recovery, invitation links via `/auth/confirm`,
access-denied page and the console). Access requires an active row in `public.admin_memberships`;
the check runs on the server and in Postgres Row Level Security.

Configure the app with the public values only (see [`.env.example`](.env.example)):

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://wdcbbjvxrcxuaabcipqo.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable key from Project Settings → API Keys>
```

Never put the secret/service-role key, SMTP or Google credentials in `NEXT_PUBLIC_` variables or in the repository.

### Local stack

```bash
npm run db:start          # Postgres 17, Auth, Data API, Mailpit (Supabase CLI, Docker)
npm run db:test           # pgTAP RLS/privilege tests
npm run db:lint           # plpgsql_check on database functions
npm run test:e2e:local    # build against the local stack, then all Playwright tests
npm run db:types          # regenerate src/lib/supabase/database.types.ts after schema changes
npm run db:stop
```

Local test emails (invites, password recovery) arrive in Mailpit at http://127.0.0.1:54324.
`supabase/config.toml` configures the local stack only; do not `supabase config push` it to a hosted project.

### Hosted dev project

Migrations in `supabase/migrations/` are applied to the dev project `wdcbbjvxrcxuaabcipqo`
(organization `telemart-ubon`) only through `scripts/supabase/push-dev.mjs`. Before the CLI touches a
database it checks the project ref and organization through the Management API, and it ignores
environment variables that would point the CLI at another project. It runs the same from cmd,
PowerShell and bash. Set a personal access token (https://supabase.com/dashboard/account/tokens) for the
current terminal only, never in `.env.local`:

```text
cmd         set SUPABASE_ACCESS_TOKEN=sbp_...
PowerShell  $env:SUPABASE_ACCESS_TOKEN = "sbp_..."
bash        export SUPABASE_ACCESS_TOKEN=sbp_...
```

```bash
npm run db:push:dev         # verify the target, link, show pending migrations (dry run)
npm run db:push:dev:apply   # the same, then type the ref to apply
```

No database password is needed: the Supabase CLI signs in with a temporary login role created from the
token (or set `SUPABASE_DB_PASSWORD`).

After the migration is applied, create the first Admin in Dashboard → Authentication → Users → Add user
(create the user with a password, or send an invitation), then run
`select private.grant_admin('person@example.com', 'Initial Admin');` in the SQL editor. `private.grant_admin`
exists only once the migration is applied, and it only finds users that already exist in Authentication.

## Continuous integration

`.github/workflows/ci.yml` runs lint, typecheck, unit tests, a production build without secrets and a
production dependency audit, then starts the local Supabase stack for the database tests and the full
Playwright suite.
