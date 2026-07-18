# Users Module

The users module owns backend user/profile persistence helpers and mapping to
shared contracts.

Current scope:

- create a `User` and `UserProfile` in one Prisma transaction
- fetch users with their profile
- fetch internal auth user data by email for login
- update an authenticated user's profile by that user's ID
- map Prisma data into shared API contracts

The mapper layer is the boundary between database records and API responses. It
keeps fields such as `passwordHash`, internal timestamps, and storage-specific
details out of shared contracts.

Auth lookup methods may read `passwordHash` internally, but controllers should
never expose it.

Controllers should not return raw Prisma user records.
