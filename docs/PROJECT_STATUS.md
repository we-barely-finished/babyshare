# Project Status

## Current phase

Backend foundation implementation.

## Current goal

Implement profile endpoints.

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

## In progress

- Planning profile endpoints

## Next task

Implement profile endpoints:

- `GET /api/profiles/me`
- `PATCH /api/profiles/me`

## Upcoming milestones

1. Add profile endpoints.
2. Add admin user status/role endpoints.
3. Implement items.
4. Implement image upload.
5. Implement dashboard/search.
6. Implement chat.
7. Implement reports/admin.
8. Implement manual renewals.

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
