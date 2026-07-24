type Environment = NodeJS.ProcessEnv;

export function getDatabaseUrl(environment: Environment = process.env): string {
  return getRequiredValue(environment, 'DATABASE_URL');
}

export function getJwtSecret(environment: Environment = process.env): string {
  return getRequiredValue(environment, 'JWT_SECRET');
}

export function getPort(environment: Environment = process.env): number {
  const value = environment['PORT'];

  if (value === undefined) {
    return 3000;
  }

  const normalized = value.trim();
  const port = Number(normalized);

  if (
    normalized.length === 0 ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535
  ) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return port;
}

function getRequiredValue(environment: Environment, name: string): string {
  const value = environment[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}
