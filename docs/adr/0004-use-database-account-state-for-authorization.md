# ADR 0004: Use Database Account State for Authorization

## Status

Accepted

## Context

BabyShare issues signed JWT access tokens containing `sub`, `email`, and `role`.
Those claims are a snapshot taken at login time. A user's account status, email,
or role can change while an access token remains valid.

The API needs one clear source of truth for authentication and
authorization-sensitive decisions.

## Decision

A successfully verified JWT establishes that the token is authentic and
identifies its subject through the non-empty `sub` claim. The API must then load
the current account from the database before making decisions that depend on
account status or role.

Current database values are authoritative:

- database `status` controls whether the account may use a protected operation;
- database `role` controls admin authorization;
- JWT `email` and `role` claims may describe the login-time account, but must
  not be the sole source for authorization-sensitive decisions.

The currently implemented account-status behavior is:

- `ACTIVE`: may log in and use implemented authenticated account/profile
  operations;
- `INACTIVE`: may log in and use implemented own-account and own-profile
  operations; broader visibility/content behavior remains governed by the
  documented product rules for each future feature;
- `BLOCKED`: cannot log in and is rejected from implemented protected
  account/profile operations;
- `DELETED`: cannot log in and is rejected from implemented protected
  account/profile operations.

Unknown token subjects return `401`. Known blocked or deleted subjects return
`403` for the currently implemented protected operations.

Refresh tokens, access-token revocation, logout invalidation, and immediate
server-side invalidation of already-issued tokens remain outside the current
MVP. Even without token invalidation, loading current database state prevents a
stale JWT role or status snapshot from becoming the authorization source of
truth.

## Consequences

- Protected services must load current account data when status matters.
- Future admin guards/services must authorize against the current database role,
  not only the JWT role claim.
- JWT verification remains useful and required, but it is not a substitute for
  current authorization data.
- Authorization-sensitive database reads add a small amount of request work in
  exchange for predictable role and status enforcement.
