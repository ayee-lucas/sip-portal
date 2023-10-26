const ROOT_PATH = 'http://localhost:8082';
const PORTAL_PREFIX = '/sip-services';
const API_PREFIX = '/api';
const USER_PREFIX = '/user';
const PROFILE_PREFIX = '/profile';
const PARKING_PREFIX = '/parking';

export const environment = {
  ROUTE: {
    audit: 'audit',
    users: 'users',
    security: 'auth',
    login: 'login'
  },
  SERVER_PATH: {
    USERS: ROOT_PATH + PORTAL_PREFIX + API_PREFIX + USER_PREFIX,
    PROFILES: ROOT_PATH + PORTAL_PREFIX + API_PREFIX + PROFILE_PREFIX,
    PARKING: ROOT_PATH + PORTAL_PREFIX + API_PREFIX + PARKING_PREFIX
  },
  refTranslate: './assets/i18n/'
};
