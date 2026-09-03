import { getJwtSecret } from './auth.module';

describe('getJwtSecret', () => {
  const originalJwtSecret = process.env.JWT_SECRET;

  afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });

  it('returns the configured secret when JWT_SECRET is present', () => {
    process.env.JWT_SECRET = 'super-secret-value';

    expect(getJwtSecret()).toBe('super-secret-value');
  });

  it('returns a development fallback when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;

    expect(getJwtSecret()).toBe('dev-secret-key-change-me');
  });
});
