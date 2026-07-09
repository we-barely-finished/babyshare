# ADR 0003: Use User Account and User Profile Split

## Status

Accepted

## Context

BabyShare needs user accounts for authentication and authorization, but also needs user-facing profile information for marketplace interactions.

The platform should support:

- regular users
- admins
- active/inactive users
- admin-blocked users
- user profiles with basic public information
- private contact/location details
- future extension for more contacts, addresses, verification, and avatars

For the MVP, we want to keep the model simple while avoiding obvious refactoring problems later.

## Decision

We will split user data into two related concepts:

- `User` for account/authentication/authorization data
- `UserProfile` for personal/profile/contact/location data

A user will have exactly one profile.

For MVP, each user will have:

- one email address
- one optional phone number
- one address/location record stored directly on the profile
- one public display name

We will not support multiple addresses or multiple contact methods in the MVP.

We will use enums for roles and account status:

- `UserRole`: `USER`, `ADMIN`
- `UserStatus`: `ACTIVE`, `INACTIVE`, `BLOCKED`, `DELETED`

We will not use separate `isActive`, `isBlocked`, or `isAdmin` booleans.

## Public and private profile data

Publicly visible profile data:

- `displayName`
- `city`
- `municipality`
- `bio`

Private profile data:

- `email`
- `phoneNumber`
- `addressLine`
- `firstName`
- `lastName`

The exact address and direct contact details should not be shown publicly by default. Users can agree on pickup, delivery, payment, and other details through chat.

## MVP exclusions

The MVP will not include:

- multiple addresses per user
- multiple contact methods per user
- profile avatar/photo
- email verification timestamp
- last login timestamp
- advanced privacy settings

These may be added later if the product needs them.

## Alternatives considered

### Single User table only

All fields could be stored directly on `User`. This would be simpler initially, but would mix authentication data with profile data and make future privacy/profile changes messier.

### Multiple address and contact tables from the start

This would be more flexible, but it is unnecessary for the MVP and would add UI, validation, and API complexity.

### Boolean flags such as `isActive`, `isBlocked`, `isAdmin`

Multiple booleans can create conflicting states, such as a user being both active and blocked. A status enum and role enum are clearer and easier to enforce.

### Usernames

Usernames are not required for the MVP. A `displayName` is enough for public identity.

## Consequences

### Positive

- Clear separation between account and profile data.
- Simpler authorization and admin logic.
- Cleaner public/private data handling.
- Easy to extend later with avatars, verification, multiple contacts, or multiple addresses.
- Avoids conflicting boolean combinations.

### Negative

- Requires joining `User` and `UserProfile` for some operations.
- Slightly more complex than a single user table.
- Public/private profile rules must be enforced carefully in API responses.

## Notes

This decision supports a privacy-friendly marketplace flow. Users should not need to publicly expose exact addresses or direct contact details to buy/sell items.
