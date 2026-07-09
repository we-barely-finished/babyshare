# Project Status

## Current phase

Local infrastructure setup.

## Current goal

Verify Docker Compose local services before feature development begins.

## Completed

- WSL/Ubuntu setup
- Git setup
- GitHub authentication fixed
- Docker WSL permission issue fixed
- Codex installed
- GitHub repository connected
- Branch/folder structure repaired
- Project documentation structure added
- `AGENTS.md` added
- `README.md` added
- Initial ADRs added
- Coding workflow documented
- Node.js runtime switched to Node 22 LTS-compatible runtime
- Dependencies reinstalled
- Nx workspace project discovery verified
- API, web, and shared types build targets verified
- API, web, and shared types test targets verified

## In progress

- Verifying local infrastructure setup

## Next task

Verify Docker Compose local services.

Current verification result:

- `npx nx show projects` succeeds and discovers `types`, `api-e2e`, `api`, and `web`.
- `npx nx build api` succeeds.
- `npx nx build web` succeeds with the existing Angular component style budget warning for `apps/web/src/app/nx-welcome.ts`.
- `npx nx build types` succeeds.
- `npx nx test api` succeeds: 2 suites, 3 tests.
- `npx nx test web` succeeds: 1 suite, 1 test.
- `npx nx test types` succeeds: 1 suite, 1 test.

Observed local runtime:

- Node.js: `v22.23.1`
- npm: `10.9.8`

Observed Nx notes:

- `@nx/jest:jest` is deprecated and should be migrated before Nx v24.
- `npx nx report` still fails with `Cannot determine the version of npm`.
- Inside Codex's sandbox, Nx can fail to bind plugin/daemon sockets under `/tmp` with `EPERM`; the successful verification above was run outside the sandbox after approval.

Recommended next check:

1. Check whether Docker Compose services are already defined.
2. If not present, add a minimal Docker Compose setup for PostgreSQL and Mailpit.
3. Add or verify `.env.example`.
4. Document local infrastructure startup in `README.md`.

## Upcoming milestones

1. Verify Nx workspace builds.
2. Add/verify NestJS API app.
3. Add/verify shared TypeScript library.
4. Add Docker Compose for PostgreSQL and Mailpit.
5. Add Prisma.
6. Add first database schema.
7. Add API health endpoint.
8. Add first frontend API call.
9. Implement auth.
10. Implement profiles.
11. Implement items.
12. Implement image upload.
13. Implement dashboard/search.
14. Implement chat.
15. Implement reports/admin.
16. Implement manual renewals.

## Notes

Keep MVP scope strict. Optional features such as profile comments, automated payments, and advanced filters are intentionally excluded until the core flow is working.
