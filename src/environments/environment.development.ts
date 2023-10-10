const ROOT_PATH = 'http://localhost:8082';
const PORTAL_PREFIX = '/sip-services';
const API_PREFIX = '/api';
const USER_PREFIX = '/user';

export const environment = {
  ROUTE: {
    audit: 'audit',
    users: 'users',
    security: 'auth',
    login: 'login'
  },
  SERVER_PATH: {
    GET_USERS: ROOT_PATH + PORTAL_PREFIX + API_PREFIX + USER_PREFIX
  },
  refTranslate: './assets/i18n/'
};
