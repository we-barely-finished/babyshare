# Project Status

## Current phase

Backend foundation hardening and planning reconciliation.

## Current goal

Finish foundation hardening, then resolve which product slice comes next.

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
- Node.js version switched to supported LTS version
- Nx workspace verification completed
- Docker Compose/local infrastructure verification completed
- Prisma integration verified
- `GET /api/health` endpoint implemented
- `GET /api/health/db` endpoint implemented
- Initial Prisma `User` and `UserProfile` models implemented
- Prisma `UserRole` and `UserStatus` enums implemented
- Initial user/profile database migration created and applied
- Shared user/profile TypeScript contracts implemented
- AuthModule skeleton added
- UsersService foundation added
- User/profile mapper functions added for shared contracts
- `POST /api/auth/register` endpoint implemented
- Registration password hashing with Argon2 added
- Global request validation pipe added
- UserProfile municipality made optional
- Lightweight backend/shared developer documentation added
- `POST /api/auth/login` endpoint implemented
- JWT access token response added for login
- Authenticated `GET /api/auth/me` endpoint implemented
- Minimal JWT bearer auth guard added
- Auth foundation cleanup completed before profile endpoints
- Authenticated `GET /api/profiles/me` endpoint implemented
- Authenticated `PATCH /api/profiles/me` endpoint implemented
- Own-profile validation, trimming, nullable-field clearing, and account-status handling added
- Auth/profile API correctness and privacy hardening completed
- Required profile patch fields now reject explicit null values
- Login status, JWT role validation, and database field projections hardened
- Database-free HTTP contract tests added for auth/profile boundaries
- Repository environment handling and authoritative verification safeguards added
- Conventional Nx lint targets and minimal GitHub Actions CI added
- Workspace-level TypeScript strictness enabled for API, web, and shared types
- Starter root API endpoint removed and health checks moved to `HealthModule`
- Authentication/authorization source-of-truth rules recorded in ADR 0004

## In progress

- Resolving product sequencing after foundation hardening

## Next task

Make an explicit product decision between:

- admin user role/status endpoints; or
- the items vertical slice.

Codex must not choose this sequencing decision.

## Upcoming milestones

The immediate ordering of admin user management and items is unresolved. After
that decision, continue with image upload, dashboard/search, chat,
reports/moderation, and manual renewals in the agreed order.

## Milestone interpretation

- Authentication backend endpoints are implemented; Angular login/register
  pages are still required before Milestone 4 is complete.
- Own-profile backend endpoints are implemented; profile view/edit pages are
  still required before Milestone 5 is complete.

## Notes

Locked MVP user/account decisions:

- one email per user
- one optional phone number per user
- one address/location set per profile
- no multiple contacts in MVP
- no multiple addresses in MVP
- no profile avatar/photo in MVP
- no email verification timestamp in MVP
- no last login tracking in MVP
- admins are users with `role = ADMIN`
- use `UserStatus` enum instead of `isActive`/`isBlocked` booleans
- use `displayName` for public identity
- keep phone number and exact address private by default
