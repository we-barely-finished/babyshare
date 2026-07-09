# Project Status

## Current phase

Backend foundation implementation.

## Current goal

Add shared user/profile types before implementing authentication and profile APIs.

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

## In progress

- Planning shared user/profile contracts

## Next task

Implement shared TypeScript contracts for:

- `User`
- `UserProfile`
- `UserRole`
- `UserStatus`

The implementation should not add authentication endpoints yet.

## Upcoming milestones

1. Add shared user/profile types.
2. Add Auth module.
3. Add registration endpoint.
4. Add login endpoint.
5. Add authenticated `GET /api/auth/me`.
6. Add profile endpoints.
7. Add admin user status/role endpoints.
8. Implement items.
9. Implement image upload.
10. Implement dashboard/search.
11. Implement chat.
12. Implement reports/admin.
13. Implement manual renewals.

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
