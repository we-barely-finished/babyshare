# Implementation Plan

## Principle

Build BabyShare as vertical slices. Each milestone should produce something visible or testable.

Core user journey:

Register -> create profile -> post item -> browse item -> view item details -> contact seller -> chat.

## Milestone 0: Repository foundation

Goal: The repo is easy to understand, run, and extend.

Tasks:

- create docs structure
- add `AGENTS.md`
- verify GitHub remote
- verify Nx workspace
- verify Docker Compose
- verify Codex can read project context

Done when:

- docs exist
- project can be cloned and understood from README/docs
- Codex has durable project instructions

## Milestone 1: Local infrastructure

Goal: Local database and development services work.

Tasks:

- add Docker Compose with PostgreSQL
- add Mailpit
- add `.env.example`
- document local setup in README

Done when:

- `docker compose up -d` starts services
- database is reachable
- Mailpit UI is reachable

## Milestone 2: Backend foundation

Goal: NestJS API is running and connected to the database.

Tasks:

- add/verify NestJS API app
- add health endpoint
- add Prisma
- add PrismaService
- add initial schema
- run first migration

Done when:

- `GET /api/health` works
- Prisma migration runs
- API can connect to PostgreSQL

## Milestone 3: Shared contracts

Goal: Frontend and backend share core types.

Tasks:

- create shared type library
- add enums for item status, user role, report status, renewal status
- add basic request/response interfaces where useful

Done when:

- both apps can import shared types
- build passes

## Milestone 4: Authentication

Goal: Users can register and log in.

Tasks:

- implement user model
- implement password hashing
- implement register endpoint
- implement login endpoint
- issue JWT or session token
- add auth guard
- add Angular login/register pages

Done when:

- user can register
- user can log in
- authenticated request works

## Milestone 5: Profiles

Goal: Users can create and edit their profile.

Tasks:

- profile model
- profile API
- profile page
- edit profile form

Done when:

- user can view and update own profile

## Milestone 6: Items

Goal: Users can post and view items.

Tasks:

- item model
- create item endpoint
- list active items endpoint
- item detail endpoint
- edit own item endpoint
- mark own item as sold
- Angular dashboard
- item detail page
- create item page

Done when:

- user can create item
- item appears on dashboard
- another user can view item details

## Milestone 7: Photos

Goal: Items can have photos.

Tasks:

- local upload strategy for development
- item photo model
- upload endpoint
- validate file type and size
- display item gallery

Done when:

- item must have at least one photo
- photos display on dashboard/detail page

## Milestone 8: Search and filtering

Goal: Users can discover items.

Tasks:

- search by title
- filter by category
- filter by city
- show only active non-expired items

Done when:

- dashboard supports basic search/filtering

## Milestone 9: Chat

Goal: Buyer can contact seller.

Tasks:

- conversation model
- message model
- start conversation endpoint
- send message endpoint
- list conversations
- view conversation messages
- Angular chat UI

Done when:

- two users can exchange messages about an item

## Milestone 10: Reports and admin

Goal: Admin can moderate basic problems.

Tasks:

- report model
- create report endpoint
- admin list reports
- admin resolve report
- admin hide item
- Angular admin pages

Done when:

- user can report item/user
- admin can hide item and resolve report

## Milestone 11: Manual renewals

Goal: Listings can be manually renewed.

Tasks:

- renewal model
- request renewal endpoint
- admin approve/reject renewal
- extend listing expiry by 30 days

Done when:

- user can request renewal
- admin can approve renewal
- item expiry updates

## Milestone 12: Deployment preparation

Goal: The app can be deployed later.

Tasks:

- Dockerfile for API
- frontend build docs
- production env docs
- database migration deployment docs
- image storage decision
- deployment ADR

Done when:

- deployment path is documented
