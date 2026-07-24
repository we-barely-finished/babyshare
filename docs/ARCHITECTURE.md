# Architecture

Status: Draft / actively evolving.

BabyShare is an Nx monorepo with an Angular frontend, NestJS backend,
PostgreSQL database, Prisma ORM, and shared TypeScript contracts.

## Workspace Responsibilities

### `apps/api`

The API app owns backend behavior.

Current responsibilities:

- expose HTTP endpoints under the `/api` global prefix
- validate incoming request DTOs
- coordinate application services such as auth and users
- hash passwords before persistence
- use Prisma through `PrismaService`
- map database records into response contracts before returning them

The API should enforce validation, privacy, and authorization rules. Frontend
checks can improve usability, but they are not a security boundary.

### `apps/web`

The web app owns the browser user experience.

Current responsibilities:

- render Angular routes and components
- call backend endpoints
- use shared contracts for API request and response shapes where useful
- keep UI-specific state and presentation logic out of backend modules

The web app should not be the only place where business rules are enforced.

### `libs/shared/types`

The shared types library owns TypeScript contracts that are useful on both sides
of the application boundary.

Current responsibilities:

- shared enums such as `UserRole` and `UserStatus`
- response contracts such as `MyUser`, `MyUserProfile`, and
  `PublicUserProfile`
- request contracts that do not depend on a backend-only library

Shared contracts describe what the API exposes, not how the database stores it.

### `prisma/schema.prisma`

The Prisma schema owns the database model.

Current responsibilities:

- define persisted tables, columns, enums, relations, and constraints
- generate Prisma Client types for backend database access
- serve as the source for database migrations under `prisma/migrations`

Prisma models are backend implementation details. They may include private
fields, internal timestamps, relation details, and storage-oriented shapes that
should not be returned directly from API endpoints.

## Shared Contracts Are Not Prisma Models

Shared contracts and Prisma models intentionally serve different purposes.

Prisma models represent stored data. For example, `User.passwordHash` exists in
the database and Prisma Client because the backend must persist credentials, but
it must never be returned to the frontend.

Shared contracts represent API-facing data. For example, `MyUser` includes the
current user's account identity and profile, but excludes `passwordHash`,
database timestamps, and other fields that are not part of the public API
contract.

Keeping these separate makes it easier to:

- avoid leaking private fields
- change database implementation details without breaking clients
- expose different shapes for public profile views and own-profile views
- keep frontend code independent from Prisma and backend-only dependencies

## Why Mappers Exist

Mappers convert Prisma records into shared API contracts.

The current user mapper layer:

- turns `User + UserProfile` Prisma data into `MyUser`
- turns `UserProfile` Prisma data into public or own-profile contracts
- centralizes public/private field selection
- prevents controllers and services from returning raw Prisma records

User persistence queries use explicit Prisma projections. Credential lookup for
login is the only read operation that selects `passwordHash`; current-user and
profile operations select only the account/profile fields their mappers need.
Prisma-specific record-not-found translation remains in the users persistence
layer so profile application services operate on null/not-found results instead
of Prisma error codes.

This keeps privacy decisions close to the backend data boundary and makes future
API response changes easier to review.
