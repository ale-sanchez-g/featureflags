# featureflags
example to use feature management on a react web calculator

[![Run Playwright Tests](https://github.com/ale-sanchez-g/featureflags/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/ale-sanchez-g/featureflags/actions/workflows/playwright-tests.yml)

## Quick start

1. Clone the repository
2. Install dependencies
```bash
npm ci
```
3. Create a `.env` (for local) or `.env.production` (for deploy) with:
```bash
REACT_APP_CLIENT_SIDE_ID=Get_your_client_id_from_LaunchDarkly
```
4. Run the app:
```bash
npm start
```

## Deploy to GitHub Pages

1. Add `REACT_APP_CLIENT_SIDE_ID` to `.env.production`
2. Build & deploy:
```bash
npm run deploy:production
```

## Playwright tests

- Config: `playwright.config.js`
- Run tests:
```bash
# Example: run all tests
npx playwright test
```

## Security CI & OPA policy

This repository includes a security CI workflow that runs OPA to enforce that Pull Requests reference an issue. Relevant files:

- Workflow: `.github/workflows/security-cycle.yml`
- Policy: `.github/opa/policies/pr_has_issue.rego`

Note: the `pr_has_issue.rego` policy used Rego heads that were incompatible with the OPA parser used in CI; the rule names and bodies were updated to the supported Rego v1 form (uses `if { ... }` rule bodies). If you modified or added policies, ensure they parse with your OPA version.

### Run OPA policy locally

Option A — using Docker (same as CI):

```bash
# from repo root
docker run --rm -v "$PWD":/src openpolicyagent/opa eval \
	-i /src/pr_input.json \
	--data /src/.github/opa/policies \
	"data.pr_has_issue.allow" --format pretty
```

To create a quick test input:
```bash
echo '{"pull_request":{"body":"Closes #123"}}' > pr_input.json
```

Test the repository policy with match/nomatch inputs (if you keep test inputs under `opa/test` or similar):
```bash
docker run --rm -v "$PWD":/src openpolicyagent/opa eval \
	-i /src/opa/test/pr_input_match.json --data /src/.github/opa/policies \
	"data.pr_has_issue.allow" --format pretty

docker run --rm -v "$PWD":/src openpolicyagent/opa eval \
	-i /src/opa/test/pr_input_nomatch.json --data /src/.github/opa/policies \
	"data.pr_has_issue.allow" --format pretty
```

Option B — using a locally installed `opa` binary:

```bash
# Install: https://www.openpolicyagent.org/docs/latest/
opa eval -i pr_input.json --data .github/opa/policies "data.pr_has_issue.allow" --format pretty
```

### How the workflow builds input in CI

The CI workflow generates a small JSON with the PR body and runs the same `opa eval` command inside Docker. Example snippet from the workflow:

```bash
jq -n --arg body "$(jq -r .pull_request.body < \"$GITHUB_EVENT_PATH\")" '{"pull_request":{"body":$body}}' > pr_input.json
docker run --rm -v "$GITHUB_WORKSPACE":/src openpolicyagent/opa eval -i /src/pr_input.json --data /src/.github/opa/policies "data.pr_has_issue.allow" --format pretty
```

## Notes & references

- App entry: `src/index.js`
- Feature flags usage: `src/App.js`
- Calculator modules: `src/modules/ClassicCalculator.js`, `src/modules/ScientificCalculator.js`

If you want, I can also add example `opa` test inputs under `opa/test/` and a small script to run the checks locally.