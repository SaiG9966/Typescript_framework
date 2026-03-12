# Typescript Framework

Fresh Playwright + Cucumber + TypeScript automation framework template.

## What this repo contains

- `playwright-bdd-framework/` → main test framework
- Zero active test scenarios by default (template mode)
- No hardcoded URLs or credentials

## Quick Start

```bash
cd playwright-bdd-framework
npm install
npx playwright install
Copy-Item .env.example .env
npm run bdd
```

## Documentation

- Full documentation: `playwright-bdd-framework/README.md`
- User quick guide: `playwright-bdd-framework/README.users.md`

## Common Commands

From repo root:

```bash
npm run setup
npm run test
npm run report
npm run open-report
```

From framework folder:

```bash
npm run bdd
npm run steps:check
npm run report:generate
npm run report:open
```

## Notes

- Keep `.env` local and never commit real secrets.
- This repository is intended as a reusable starter base.
