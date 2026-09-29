#!/usr/bin/env bash
# Builds the app against the local Supabase stack and runs the Playwright suite,
# including the Admin authentication flows. Start the stack first:
#   npm run db:start
#   npm run test:e2e:local [-- <playwright args>]
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
eval "$(bash scripts/supabase/local-env.sh)"

npm run build
npx playwright test "$@"
