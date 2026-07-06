# BabyShare MVP - Codex Instructions

This is a learning-first full-stack monorepo.

## Stack

- Nx monorepo
- Angular frontend in apps/web
- NestJS backend in apps/api
- PostgreSQL
- Prisma
- Docker Compose for local services
- Shared TypeScript types in libs/shared/types

## Product

The app is a second-hand baby items marketplace.

Core MVP:
- users can register and log in
- users have profiles
- users can post items with title, description, category, city, and photos
- users can browse recent active items
- users can search/filter items
- users can open item details
- users can start chat with seller
- users can report items/users
- admin can hide items and manage reports
- listings expire after 30 days
- admin can manually renew listings

Out of scope for now:
- automated payments
- profile comments
- native mobile app
- advanced filters
- complex email notification system

## Coding rules

- Keep changes small and reviewable.
- Do not disable validation or authorization to make something work.
- Prefer clean NestJS modules and services.
- Keep API contracts mirrored in shared types when useful.
- Add or update tests when changing business logic.
- Never commit secrets.
