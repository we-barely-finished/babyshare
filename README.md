# BabyShare

BabyShare is a learning-first full-stack MVP for a second-hand baby items marketplace.

The goal is to build the project in-house from start to finish, using it as a practical learning opportunity for full-stack development, local development setup, backend/frontend architecture, database design, Docker, deployment, and AI-assisted development with Codex.

## Product idea

BabyShare allows users to post, browse, and discuss second-hand baby items such as:

* clothes
* toys
* strollers
* baby furniture
* accessories
* other baby-related items

Users can create profiles, post items with photos, browse recently posted items, filter/search listings, view item details, and start a chat with the seller.

The MVP also includes basic admin/moderation functionality and manual listing renewals.

## MVP scope

### Included

* User registration and login
* User profiles
* Item listings
* Mandatory item title, description, category, city, and at least one photo
* Dashboard with recently posted active items
* Search by item title
* Basic filters by category and city
* Item detail page
* Buyer/seller chat
* Report item/user
* Basic admin panel
* Listing expiry after 30 days
* Manual admin-approved listing renewals

### Excluded for now

* Automated payments
* Shipping integration
* Native mobile apps
* Profile comments/trust reviews
* Advanced filters
* Automated moderation
* Recommendation engine
* Complex email notification system

## Tech stack

* Monorepo: Nx
* Frontend: Angular
* Backend: NestJS
* Database: PostgreSQL
* ORM: Prisma
* Local infrastructure: Docker Compose
* Shared code: TypeScript libraries under `libs/`
* Local email testing: Mailpit
* Future image storage: Cloudflare R2 or S3-compatible storage
* Future production email: Resend, Postmark, or SES

## Repository structure

```txt
babyshare/
  apps/
    web/                # Angular frontend
    api/                # NestJS backend

  libs/
    shared/
      types/            # Shared TypeScript types, enums, and contracts

  prisma/
    schema.prisma       # Prisma schema
    migrations/         # Database migrations

  docs/
    PRODUCT_SCOPE.md
    IMPLEMENTATION_PLAN.md
    PROJECT_STATUS.md
    ARCHITECTURE.md
    DATA_MODEL.md
    API_PLAN.md
    CODING_WORKFLOW.md
    adr/

  docker-compose.yml
  AGENTS.md
  README.md
```

## Requirements

For local development, use WSL2/Ubuntu on Windows.

Required tools:

* Git
* Node.js via `nvm`
* npm
* Docker Desktop with WSL2 integration
* Docker Compose
* Codex CLI

## Local setup

Clone the repository:

```bash
git clone git@github.com:we-barely-finished/babyshare.git
cd babyshare
```

Install dependencies:

```bash
npm install
```

Start local infrastructure:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Run the backend API:

```bash
npx nx serve api
```

Run the frontend web app in another terminal:

```bash
npx nx serve web
```

## Useful commands

List Nx projects:

```bash
npx nx show projects
```

Build the frontend:

```bash
npx nx build web
```

Build the backend:

```bash
npx nx build api
```

Run tests:

```bash
npx nx test web
npx nx test api
```

Run affected checks:

```bash
npx nx affected -t build
npx nx affected -t test
```

Start Docker services:

```bash
docker compose up -d
```

Stop Docker services:

```bash
docker compose down
```

## Prisma

After Prisma is configured, database migrations should be created with:

```bash
npx prisma migrate dev --name <migration-name>
```

Generate Prisma client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

## Project documentation

Important project docs:

* `AGENTS.md` — instructions for Codex and AI-assisted development
* `docs/PRODUCT_SCOPE.md` — product scope and MVP boundaries
* `docs/IMPLEMENTATION_PLAN.md` — ordered implementation roadmap
* `docs/PROJECT_STATUS.md` — current progress and next task
* `docs/ARCHITECTURE.md` — technical architecture overview
* `docs/DATA_MODEL.md` — planned database model
* `docs/API_PLAN.md` — planned backend API endpoints
* `docs/CODING_WORKFLOW.md` — development workflow and conventions
* `docs/adr/` — architecture decision records

## Codex workflow

Codex should be used as a development assistant, not as an autopilot.

Before coding, Codex should read:

* `AGENTS.md`
* `docs/PRODUCT_SCOPE.md`
* `docs/IMPLEMENTATION_PLAN.md`
* `docs/PROJECT_STATUS.md`

Codex should work in small, reviewable tasks.

Good task example:

```txt
Create a minimal NestJS health endpoint at GET /api/health that returns { "status": "ok" }.
Keep the change small.
Run the relevant build/test command.
Update docs/PROJECT_STATUS.md with what changed and the next recommended task.
```

Bad task example:

```txt
Build the whole app.
```

## Development principle

Build the app as vertical slices.

The core journey is:

```txt
Register -> create profile -> post item -> browse item -> view item details -> contact seller -> chat
```

Each milestone should produce something visible, testable, and easy to review.

## Current phase

Foundation setup.

The immediate goal is to make sure the monorepo, Docker services, NestJS API, Angular frontend, Prisma setup, and project documentation are all in place before feature development begins.

