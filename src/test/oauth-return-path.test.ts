import { describe, expect, it } from 'vitest';
import { oauthReturnPath } from '../lib/oauth-return-path';

describe('OAuth return paths', () => {
  it('preserves the consent request through login', () => {
    expect(oauthReturnPath('/.lovable/oauth/consent?authorization_id=abc#review')).toBe('/.lovable/oauth/consent?authorization_id=abc#review');
  });
  it.each(['//outside.invalid', '/\\outside.invalid', '/auth\n', 'https://outside.invalid', null])('rejects unsafe return path %s', value => {
    expect(oauthReturnPath(value)).toBe('/');
  });
});