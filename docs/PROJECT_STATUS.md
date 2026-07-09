# Project Status

## Current phase

Backend foundation planning.

## Current goal

Define the initial user/account/profile model before implementing authentication and profile APIs.

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

## In progress

- Planning and implementing initial user/account/profile database model

## Next task

Implement only the initial Prisma models for:

- `User`
- `UserProfile`
- `UserRole`
- `UserStatus`

The implementation should not add authentication endpoints yet.

## Upcoming milestones

1. Implement initial User/UserProfile Prisma models.
2. Add Prisma migration for user/account/profile model.
3. Add shared user/profile types.
4. Add Auth module.
5. Add registration endpoint.
6. Add login endpoint.
7. Add authenticated `GET /api/auth/me`.
8. Add profile endpoints.
9. Add admin user status/role endpoints.
10. Implement items.
11. Implement image upload.
12. Implement dashboard/search.
13. Implement chat.
14. Implement reports/admin.
15. Implement manual renewals.

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
