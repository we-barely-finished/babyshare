# Auth Module

The auth module owns authentication-related HTTP endpoints and orchestration.

Current scope:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- request validation through DTO classes
- password hashing before persistence
- password verification during login
- JWT access token issuance
- JWT bearer-token validation for current-user lookup
- fail-fast startup when `JWT_SECRET` is missing
- duplicate-email conflict handling
- returning shared `MyUser` and `AuthSession` responses

The module does not own raw user persistence. It delegates user/profile creation
and lookup work to the users module.

Not implemented yet:

- refresh tokens
- logout token invalidation
