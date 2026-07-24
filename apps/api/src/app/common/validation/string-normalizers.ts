export function trimString(value: unknown): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

export function trimNullableString(value: unknown): unknown {
  const trimmed = trimString(value);

  return trimmed === '' ? null : trimmed;
}

export function normalizeRequiredString(value: string): string {
  return value.trim();
}

export function normalizeOptionalString(value?: string | null): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
