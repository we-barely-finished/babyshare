# API Plan

Status: Draft / actively evolving.

This document describes planned backend endpoints by module.

## API principles

- Keep endpoints simple and explicit.
- Do not expose private user/profile fields publicly.
- Enforce authorization in the backend, not only in the frontend.
- Admin-only operations must be protected by role checks.
- Blocked users should not be able to create content or initiate interactions.

## Health

Implemented or planned endpoints:

- `GET /api/health`
- `GET /api/health/db`

## Auth

Planned endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

MVP registration should create:

- `User`
- `UserProfile`

Registration input:

- `email`
- `password`
- `firstName`
- `lastName`
- `displayName`
- `phoneNumber`
- `city`
- `municipality`
- `addressLine`
- `bio`

Notes:

- Phone number should be optional.
- Municipality should be optional.
- Address line should be optional.
- Bio should be optional.
- Email verification is out of scope for now.

Login input:

- `email`
- `password`

Login response:

- `accessToken`
- `tokenType = Bearer`
- `user`

MVP token decision:

- login returns a signed JWT access token
- token payload includes `sub`, `email`, and `role`
- refresh tokens and logout token invalidation are out of scope for now
- blocked or deleted users cannot log in

Authenticated current-user endpoint:

- `GET /api/auth/me` requires a bearer token
- token payload is read from `sub`, `email`, and `role`
- response returns the shared `MyUser` contract
- missing, invalid, expired, or unknown-user tokens return `401`
- `BLOCKED` or `DELETED` users return `403`
- `ACTIVE` and `INACTIVE` users are allowed

## Profiles

Planned endpoints:

- `GET /api/profiles/me`
- `PATCH /api/profiles/me`
- `GET /api/profiles/:userId`

Public profile endpoint should return only:

- `displayName`
- `city`
- `municipality`
- `bio`

Private own-profile endpoint may return:

- `firstName`
- `lastName`
- `displayName`
- `phoneNumber`
- `city`
- `municipality`
- `addressLine`
- `bio`

## Admin users

Planned endpoints:

- `GET /api/admin/users`
- `GET /api/admin/users/:userId`
- `PATCH /api/admin/users/:userId/status`
- `PATCH /api/admin/users/:userId/role`

Admin operations:

- view users
- block user
- unblock user
- change role if needed

## Items

Planned later:

- `POST /api/items`
- `GET /api/items`
- `GET /api/items/:itemId`
- `PATCH /api/items/:itemId`
- `DELETE /api/items/:itemId`
- `PATCH /api/items/:itemId/mark-sold`

## Photos

Planned later:

- `POST /api/items/:itemId/photos`
- `DELETE /api/items/:itemId/photos/:photoId`

## Conversations and messages

Planned later:

- `POST /api/conversations`
- `GET /api/conversations`
- `GET /api/conversations/:conversationId/messages`
- `POST /api/conversations/:conversationId/messages`

## Reports

Planned later:

- `POST /api/reports`
- `GET /api/admin/reports`
- `PATCH /api/admin/reports/:reportId/resolve`

## Renewals

Planned later:

- `POST /api/items/:itemId/renewals`
- `GET /api/admin/renewals`
- `PATCH /api/admin/renewals/:renewalId/approve`
- `PATCH /api/admin/renewals/:renewalId/reject`
