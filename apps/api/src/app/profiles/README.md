# Profiles Module

The profiles module owns authenticated own-profile HTTP endpoints and their
application-level access checks.

Current scope:

- `GET /api/profiles/me`
- `PATCH /api/profiles/me`
- DTO validation and normalization for own-profile updates
- current account-status checks before profile access
- mapping persistence results to the shared `MyUserProfile` contract

The controller accepts HTTP DTOs, while `ProfilesService` depends on shared
application contracts rather than transport-specific DTO classes. User/profile
persistence remains in the users module.

Detailed request behavior and response fields are documented in
`docs/API_PLAN.md`. Authentication and authorization source-of-truth rules are
recorded in ADR 0004.
