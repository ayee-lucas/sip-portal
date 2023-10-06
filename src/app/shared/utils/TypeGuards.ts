import { ResponseUserError, User } from '../../users/types/response-type-users';

export function _isUser(t: User | ResponseUserError): t is User {
  if ('error' in t) return false;

  return t !== undefined && 'userId' in t;
}

export function _isResponseUserError(
  t: User | ResponseUserError
): t is ResponseUserError {
  if ('error' in t) return true;

  return false;
}
