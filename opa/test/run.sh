#!/usr/bin/env bash
set -eu

# Simple script to run OPA policy checks for the example inputs.
# Usage: bash opa/test/run.sh

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
MATCH_INPUT="/src/opa/test/pr_input_match.json"
NOMATCH_INPUT="/src/opa/test/pr_input_nomatch.json"
POLICIES_DIR="/src/.github/opa/policies"
HOST_MATCH="$REPO_ROOT/opa/test/pr_input_match.json"
HOST_NOMATCH="$REPO_ROOT/opa/test/pr_input_nomatch.json"
HOST_POLICIES="$REPO_ROOT/.github/opa/policies"

echo "Repository root: $REPO_ROOT"

run_with_docker() {
  echo "Running tests with Docker (openpolicyagent/opa)..."
  docker run --rm -v "$REPO_ROOT":/src openpolicyagent/opa eval -i "$MATCH_INPUT" --data "$POLICIES_DIR" "data.pr_has_issue.allow" --fail-defined --format pretty
  docker run --rm -v "$REPO_ROOT":/src openpolicyagent/opa eval -i "$NOMATCH_INPUT" --data "$POLICIES_DIR" "data.pr_has_issue.allow" --fail-defined --format pretty
}

run_with_local_opa() {
  echo "Running tests with local opa binary..."
  opa eval -i "$HOST_MATCH" --data "$HOST_POLICIES" "data.pr_has_issue.allow" --format pretty --fail-defined
  opa eval -i "$HOST_NOMATCH" --data "$HOST_POLICIES" "data.pr_has_issue.allow" --format pretty --fail-defined
}

if command -v docker >/dev/null 2>&1; then
  run_with_docker
elif command -v opa >/dev/null 2>&1; then
  run_with_local_opa
else
  echo "Neither 'docker' nor 'opa' found in PATH. Please install one to run these tests." >&2
  exit 2
fi

echo "Done."
