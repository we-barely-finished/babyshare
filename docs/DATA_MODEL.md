# Data Model

Status: Draft / actively evolving.

This document describes the planned database entities, relationships, enums, and important business rules.

## Current modeling principles

- Keep the MVP simple.
- Avoid over-modeling features that are not needed yet.
- Prefer clear enums over multiple overlapping booleans.
- Keep authentication/account data separate from public profile data.
- Do not expose private contact/address data publicly by default.

## Enums

### UserRole

Allowed values:

- `USER`
- `ADMIN`

Rules:

- Regular users have `USER`.
- Admin users have `ADMIN`.
- Admins are normal users with elevated permissions.

### UserStatus

Allowed values:

- `ACTIVE`
- `INACTIVE`
- `BLOCKED`
- `DELETED`

Rules:

- `ACTIVE`: user can use the platform normally.
- `INACTIVE`: user disabled their own profile; their active listings should not be publicly visible.
- `BLOCKED`: admin blocked the user; the user cannot create listings, start chats, or send messages.
- `DELETED`: soft-deleted account state for future use.

## MVP entities

## User

Represents authentication, authorization, and account status.

Planned fields:

- `id`
- `email`
- `passwordHash`
- `role`
- `status`
- `createdAt`
- `updatedAt`

Relationships:

- one `User` has one `UserProfile`
- one `User` can have many `Item` records later
- one `User` can participate in many `Conversation` records later
- one `User` can create many `Report` records later

MVP notes:

- `email` must be unique.
- Admins are represented by `role = ADMIN`.
- Blocked/inactive/deleted states are represented by `status`.
- Email verification and last login tracking are intentionally excluded for now.

## UserProfile

Represents personal, public profile, contact, and location data.

Planned fields:

- `id`
- `userId`
- `firstName`
- `lastName`
- `displayName`
- `phoneNumber`
- `city`
- `municipality`
- `addressLine`
- `bio`
- `createdAt`
- `updatedAt`

Relationships:

- one `UserProfile` belongs to exactly one `User`

Public fields:

- `displayName`
- `city`
- `municipality`
- `bio`

Private fields:

- `firstName`
- `lastName`
- `phoneNumber`
- `addressLine`

MVP notes:

- Each user has exactly one profile.
- Multiple addresses are not supported in the MVP.
- Multiple contact methods are not supported in the MVP.
- Profile avatar/photo is intentionally excluded for now.
- Exact address and phone number should not be shown publicly by default.

## Future entities

These will be added after the user/account foundation:

- `Item`
- `ItemPhoto`
- `Conversation`
- `Message`
- `Report`
- `Renewal`

## Future possible extensions

Possible later additions:

- multiple addresses per user
- multiple contact methods per user
- profile avatar/photo
- email verification timestamp
- last login timestamp
- profile privacy settings
- moderator role
