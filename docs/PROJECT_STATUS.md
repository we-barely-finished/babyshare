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

- Verifying the Nx workspace setup

## Next task

Run lightweight workspace checks:

- `npx nx show projects`
- build the Angular app
- build the NestJS API
- build/check shared libraries if available
- run available tests if configured

After the checks, update this file with the verified project state.

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
