import { AuthResponseType } from '../types/AuthResponseType';

export const ResponseAuthMock: AuthResponseType = {
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzY29wZSI6WyJvcGVuaWQiXSwidXNlcl9uYW1lIjoicm9vdEBpczR0ZWNo.lmVBtS7Afy9k1dGFgwHVKJF-vfJQomQ-WGZO4ojQkJ65G7fj2X7pyWpsWEdVg-KRbI',
  expiration: 1699679999000, // 31 de diciembre de 2023, 11:59:59 PM
  authorities: ['ROLE_QRY_AUDIT', 'ROLE_USER', 'ROLE_PROFILE']
};
