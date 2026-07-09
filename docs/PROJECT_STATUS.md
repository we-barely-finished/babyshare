# Project Status

## Current phase

Backend foundation implementation.

## Current goal

Implement `POST /api/auth/login`.

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

## In progress

- Planning `POST /api/auth/login`

## Next task

Implement `POST /api/auth/login`.

## Upcoming milestones

1. Add login endpoint.
2. Add authenticated `GET /api/auth/me`.
3. Add profile endpoints.
4. Add admin user status/role endpoints.
5. Implement items.
6. Implement image upload.
7. Implement dashboard/search.
8. Implement chat.
9. Implement reports/admin.
10. Implement manual renewals.

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
