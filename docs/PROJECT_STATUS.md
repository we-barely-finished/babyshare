# Project Status

## Current phase

Foundation verification.

## Current goal

Verify that the Nx workspace, Angular frontend, NestJS backend, shared libraries, Docker Compose setup, and project documentation are all correctly configured before feature development begins.

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

## In progress

- Resolving Nx workspace startup failure

## Next task

Fix the local Node/Nx runtime mismatch and rerun workspace checks.

Current verification result:

- `npx nx show projects` fails before project discovery.
- `npx nx build api` fails before running the target.
- `npx nx build web` fails before running the target.
- `npx nx build types` / `shared-types` fails before running the target.
- `npx nx test api` fails before running the target.
- `npx nx test web` fails before running the target.
- `npx nx test types` / `shared-types` fails before running the target.

Observed local runtime:

- Node.js: `v24.18.0`
- npm: `11.16.0`

Observed Nx error:

- Nx plugin workers exit before establishing a connection.
- `npx nx report` also fails with `Cannot determine the version of npm`.

Recommended next check:

1. Switch to a supported Node.js LTS version for the Angular/Nx toolchain.
2. Reinstall dependencies if needed.
3. Rerun:
   - `npx nx show projects`
   - `npx nx build api`
   - `npx nx build web`
   - `npx nx build types`
   - `npx nx test api`
   - `npx nx test web`
   - `npx nx test types`

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
