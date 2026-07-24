# BabyShare - Codex Instructions

## Project summary

BabyShare is a learning-first full-stack MVP for a second-hand baby items marketplace.

Users can register, create profiles, post baby items, browse/search/filter active listings, view item details, and start a chat with the seller. Admin users can review reports, hide items, and manually approve listing renewals.

This project is being built in-house as a learning opportunity, not as a rushed production delivery.

## Stack

- Monorepo: Nx
- Frontend: Angular
- Backend: NestJS
- Database: PostgreSQL
- ORM: Prisma
- Local infrastructure: Docker Compose
- Shared code: TypeScript libraries under `libs/`
- Future image storage: Cloudflare R2 or S3-compatible storage
- Local email testing: Mailpit
- Production email later: Resend/Postmark/SES

## Important directories

- `apps/web` - Angular frontend
- `apps/api` - NestJS backend
- `libs/shared/types` - shared TypeScript types/enums/contracts
- `prisma` - Prisma schema and migrations
- `docs` - project planning, status, and architecture docs

## MVP scope

Included:

- user registration/login
- user profiles
- item listings
- mandatory item title, description, category, city, and at least one photo
- dashboard with recent active items
- search by title
- basic filters by category and city
- item details page
- buyer/seller chat
- report item/user
- basic admin panel
- listing expiry after 30 days
- manual admin-approved renewals

Excluded for now:

- automated payments
- profile trust comments
- native mobile apps
- advanced filters
- complex notification system
- shipping/payment handling inside the platform

## Working rules

- Keep tasks small and reviewable.
- Do not implement multiple major features in one change.
- Before coding, check `docs/PROJECT_STATUS.md` and `docs/IMPLEMENTATION_PLAN.md`.
- After completing a meaningful task, update `docs/PROJECT_STATUS.md`.
- If a new technical decision is made, add or update an ADR in `docs/adr/`.
- Prefer simple, explicit code over clever abstractions.
- Do not weaken validation or authorization to make something work.
- Never commit secrets, tokens, passwords, or real production credentials.
- Keep `.env.example` updated when environment variables change.
- Use shared types from `libs/shared/types` when frontend and backend need the same contract.

## Verification expectations

The authoritative repository verification command is:

```bash
npm run verify
```

Codex must run this command before declaring a change complete. Focused Nx
commands may be used during development, but they do not replace the
authoritative verification run.

For backend changes:

- run relevant Nx build/test commands
- check TypeScript compilation
- keep NestJS modules clean

For frontend changes:

- run relevant Nx build/test commands
- keep Angular components focused
- avoid putting business rules only in the UI

For database changes:

- update Prisma schema
- create a migration
- document the model change in `docs/DATA_MODEL.md`

## Definition of done

A task is done when:

- the feature works locally
- code builds
- relevant docs are updated
- no secrets are committed
- the change is small enough to review
- the next task is clearly noted in `docs/PROJECT_STATUS.md`
