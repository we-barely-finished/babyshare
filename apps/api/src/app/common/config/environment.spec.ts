import { getDatabaseUrl, getJwtSecret, getPort } from './environment';

describe('environment configuration', () => {
  it.each([
    ['DATABASE_URL', getDatabaseUrl],
    ['JWT_SECRET', getJwtSecret],
  ] as const)('returns a trimmed required %s', (name, readValue) => {
    expect(readValue({ [name]: ' configured-value ' })).toBe(
      'configured-value',
    );
  });

  it.each([
    ['DATABASE_URL', getDatabaseUrl],
    ['JWT_SECRET', getJwtSecret],
  ] as const)('rejects missing or blank %s', (name, readValue) => {
    expect(() => readValue({})).toThrow(`${name} is required`);
    expect(() => readValue({ [name]: '   ' })).toThrow(`${name} is required`);
  });

  it('defaults PORT to 3000 when omitted', () => {
    expect(getPort({})).toBe(3000);
  });

  it('parses a configured PORT', () => {
    expect(getPort({ PORT: ' 4200 ' })).toBe(4200);
  });

  it.each(['', '   ', '0', '65536', '-1', '3000.5', 'not-a-port'])(
    'rejects invalid PORT %p',
    (port) => {
      expect(() => getPort({ PORT: port })).toThrow(
        'PORT must be an integer between 1 and 65535',
      );
    },
  );
});
