# Auth Module

The auth module owns authentication-related HTTP endpoints and orchestration.

Current scope:

- `POST /api/auth/register`
- request validation through DTO classes
- password hashing before persistence
- duplicate-email conflict handling
- returning shared `MyUser` responses

The module does not own raw user persistence. It delegates user/profile creation
and lookup work to the users module.

Not implemented yet:

- login
- JWT/session issuance
- auth guards
- `GET /api/auth/me`
