# Shared Types

This library contains TypeScript contracts shared by the API and web apps.

Use it for API-facing enums, request shapes, and response shapes that both sides
need to understand. Do not put Prisma models, NestJS DTO classes, Angular-only
types, or backend-only implementation details here.

Current user/profile contracts distinguish between:

- `PublicUserProfile`: profile fields that may be shown publicly
- `MyUserProfile`: the currently authenticated user's own profile, including
  private profile fields
- `MyUser`: the currently authenticated user response shape
- `AuthSession`: the login response shape containing a bearer token and user

Build and test:

```bash
npx nx build types
npx nx test types
```
