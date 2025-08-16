#!/bin/sh
# Start Next.js dev server, wait for it to be ready, then run Playwright tests
set -e
PORT=4321
NEXT_DIR="$(dirname "$0")/.."
cd "$NEXT_DIR"

# Start dev server in background
yarn next dev -p $PORT &
NEXT_PID=$!

# Wait for server to be ready
until curl -sSf http://localhost:$PORT > /dev/null; do
  sleep 1
done

# Run Playwright tests (update as needed for your test location)
npx playwright test tests/mesh-sim-provenance.spec.ts --update-snapshots

# Kill dev server
kill $NEXT_PID
