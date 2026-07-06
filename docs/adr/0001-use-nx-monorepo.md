# ADR 0001: Use Nx Monorepo

## Status

Accepted

## Context

BabyShare is being built as a learning-first full-stack MVP. The project includes a frontend application, backend API, shared TypeScript code, database schema, local infrastructure, and documentation.

We want the frontend and backend to live in the same repository so development is easier to coordinate and the project can be understood as one complete system.

## Decision

We will use an Nx monorepo.

The repository will contain:

* Angular frontend in `apps/web`
* NestJS backend in `apps/api`
* Shared TypeScript code in `libs/`
* Project documentation in `docs/`
* Prisma database schema and migrations in `prisma/`
* Local development infrastructure through Docker Compose

## Alternatives considered

### Separate frontend and backend repositories

This would keep each application isolated, but would make shared types, local setup, documentation, and coordinated changes more difficult.

### Simple npm workspace without Nx

This would be lighter than Nx, but would provide fewer built-in tools for project generation, dependency graphing, caching, and affected builds.

### Single full-stack framework

A framework such as Next.js could reduce setup complexity, but the goal of this project is to learn a more explicit frontend/backend architecture.

## Consequences

### Positive

* Frontend, backend, shared code, and docs live in one place.
* Easier local development setup.
* Easier to share TypeScript types between frontend and backend.
* Easier for Codex to understand the whole project context.
* Nx can help with builds, tests, generators, and affected project checks.

### Negative

* Nx adds some learning overhead.
* The repository structure is more complex than a single application.
* Developers need to understand basic monorepo concepts.

## Notes

This decision supports the learning goal of building the project from start to finish while keeping the codebase organized.

