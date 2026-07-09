# Project Status

## Current phase

Backend foundation.

## Current goal

Prepare the API for database connectivity checks.

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
- Docker Compose local services verified
- PostgreSQL local service verified
- Mailpit local service verified
- Prisma schema validation verified
- Prisma client generation verified
- `.env.example` added with local database and email settings
- README local infrastructure setup documented
- Minimal NestJS `GET /api/health` endpoint verified

## In progress

- Preparing PrismaService and database-backed health verification

## Next task

Add `PrismaService` and extend health verification with a database connectivity check.

Current verification result:

- `npx nx show projects` succeeds and discovers `types`, `api-e2e`, `api`, and `web`.
- `npx nx build api` succeeds after verifying `GET /api/health`.
- `npx nx build web` succeeds with the existing Angular component style budget warning for `apps/web/src/app/nx-welcome.ts`.
- `npx nx build types` succeeds.
- `npx nx test api` succeeds after verifying `GET /api/health`: 2 suites, 3 tests.
- `npx nx test web` succeeds: 1 suite, 1 test.
- `npx nx test types` succeeds: 1 suite, 1 test.

Observed local runtime:

- Node.js: `v22.23.1`
- npm: `10.9.8`

Observed Nx notes:

- `@nx/jest:jest` is deprecated and should be migrated before Nx v24.
- `npx nx report` still fails with `Cannot determine the version of npm`.
- Inside Codex's sandbox, Nx can fail to bind plugin/daemon sockets under `/tmp` with `EPERM`; the successful verification above was run outside the sandbox after approval.

Docker Compose and local infrastructure verification result:

- `docker-compose.yml` defines two services: `postgres` and `mailpit`.
- PostgreSQL uses image `postgres:16`, container `babyshare-postgres`, database `babyshare`, user `babyshare`, password `babyshare`, and host port `5432`.
- PostgreSQL readiness check succeeds with `pg_isready -U babyshare -d babyshare`.
- PostgreSQL query verification succeeds and reports current database `babyshare` and current user `babyshare`.
- Mailpit uses image `axllent/mailpit:latest`, container `babyshare-mailpit`, SMTP port `1025`, and web UI port `8025`.
- `docker compose ps` reports both `babyshare-postgres` and `babyshare-mailpit` running; Mailpit is healthy.
- Existing `.env` contains `DATABASE_URL` for the local PostgreSQL service. It does not yet contain local email settings.
- `.env.example` now contains `DATABASE_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, and `MAIL_FROM`.
- `npx prisma validate` succeeds.
- `npx prisma generate` succeeds and generates Prisma Client 7.8.0 to `generated/prisma`.
- README now documents local env setup, Docker service names, database credentials, ports, Mailpit access, and Prisma validation/generation commands.

Recommended next check:

1. Add `PrismaService`.
2. Add database connectivity verification to the health check.
3. Run the relevant API build/test verification.
4. Update project status with the result.

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
