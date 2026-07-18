import { getJwtSecret } from './jwt-secret';

describe('getJwtSecret', () => {
  const originalJwtSecret = process.env['JWT_SECRET'];

  afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env['JWT_SECRET'];
    } else {
      process.env['JWT_SECRET'] = originalJwtSecret;
    }
  });

  it('returns JWT_SECRET when it is configured', () => {
    process.env['JWT_SECRET'] = 'local-test-secret';

    expect(getJwtSecret()).toEqual('local-test-secret');
  });

  it('throws a clear error when JWT_SECRET is missing', () => {
    delete process.env['JWT_SECRET'];

    expect(() => getJwtSecret()).toThrow('JWT_SECRET is required');
  });
});
