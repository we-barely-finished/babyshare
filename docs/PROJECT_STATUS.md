# Project Status

## Current phase

Backend foundation implementation.

## Current goal

Plan the AuthModule skeleton before implementing authentication endpoints.

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

## In progress

- Planning AuthModule skeleton

## Next task

Plan and add the initial AuthModule skeleton without implementing authentication endpoints yet.

## Upcoming milestones

1. Add Auth module.
2. Add registration endpoint.
3. Add login endpoint.
4. Add authenticated `GET /api/auth/me`.
5. Add profile endpoints.
6. Add admin user status/role endpoints.
7. Implement items.
8. Implement image upload.
9. Implement dashboard/search.
10. Implement chat.
11. Implement reports/admin.
12. Implement manual renewals.

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
