# ADR 0002: Use PostgreSQL and Prisma

## Status

Accepted

## Context

BabyShare needs to store relational data such as users, profiles, item listings, item photos, conversations, messages, reports, and renewal requests.

The data model has clear relationships:

* users have profiles
* users post items
* items have photos
* users participate in conversations
* conversations have messages
* users can report items or other users
* admins can review reports and renewals

Because of these relationships, a relational database is a strong fit.

## Decision

We will use PostgreSQL as the database and Prisma as the ORM.

PostgreSQL will be used for local development through Docker Compose and later through a managed database or VPS-hosted database in production.

Prisma will be used for:

* database schema definition
* migrations
* type-safe database access
* local development tooling
* Prisma Studio during development

## Alternatives considered

### MongoDB

MongoDB could work for flexible document storage, but BabyShare’s data is relational and benefits from foreign keys, joins, constraints, and transactions.

### Supabase

Supabase would provide PostgreSQL, auth, storage, and realtime features out of the box. It was considered for a faster MVP, but the current goal is to build an in-house solution as a learning opportunity.

### TypeORM

TypeORM integrates well with NestJS, but Prisma offers a clean schema-first workflow, strong TypeScript support, and pleasant migration tooling.

### Raw SQL

Raw SQL provides maximum control, but would require more manual work and more boilerplate for common CRUD operations.

## Consequences

### Positive

* PostgreSQL is a mature relational database.
* Prisma gives type-safe database access.
* Database schema changes can be versioned through migrations.
* The data model is explicit and easy to review.
* Prisma works well with TypeScript and NestJS.

### Negative

* Prisma adds another tool to learn.
* Some complex queries may require raw SQL later.
* Migrations need to be handled carefully across environments.

## Notes

This decision supports the goal of learning database modeling, migrations, backend architecture, and production-style development practices.

