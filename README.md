# featureflags
example to use feature management on a react web calculator

[![Run Playwright Tests](https://github.com/ale-sanchez-g/featureflags/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/ale-sanchez-g/featureflags/actions/workflows/playwright-tests.yml)

## How to run the project
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## How to deploy to github pages
1. Create .env.production file with the following content:
```bash
REACT_APP_CLIENT_SIDE_ID=Get_your_client_id_from_LaunchDarkly
```
2. Run `npm run deploy:production`

## How to run locally
1. Create .env file with the following content:
```bash
REACT_APP_CLIENT_SIDE_ID=Get_your_client_id_from_LaunchDarkly
```
2. Run `npm start`