# KijaniKiosk Payments

A small Node.js payments package used to demonstrate the Week 5 CI/CD pipeline.

## Requirements

- Node.js 20 or later
- npm

## Commands

- `npm run lint` — syntax checks the application and tests.
- `npm test` — runs automated tests.
- `npm run build` — packages the module into a `.tgz` file under `dist/`.
- `npm run audit` — checks the dependency tree for high-severity or critical vulnerabilities.

The CI pipeline adds the Git commit SHA to the package version and publishes the resulting artifact to Nexus Repository.
