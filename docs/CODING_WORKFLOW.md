# Coding Workflow

Status: Draft.

Development should happen in small, reviewable steps.

Workflow:

1. Check `docs/PROJECT_STATUS.md`.
2. Pick the next smallest task.
3. Ask Codex to implement only that task.
4. Review the diff.
5. Run focused build/test commands while developing.
6. Update documentation if needed.
7. Commit the change.

Do not combine unrelated features in one task.

## Exact pre-commit sequence

From the repository root:

```bash
npm run format
npm run verify
git diff --check
git status --short
```

Review the complete diff after these commands. Commit only when `npm run verify`
passes and the status contains only the intended files. Do not commit `.env`;
share configuration keys and safe local placeholders through `.env.example`.
