import { ResponseError, User } from '../../admin/types/response-type-users';
import {
  ResponseProfile,
  ResponseProfileSuccess
} from '../../admin/types/response-type-profiles';

export function _isUser(t: User | ResponseError): t is User {
  if ('error' in t) return false;

  return t !== undefined && 'userId' in t;
}

export function _isResponseError(t: User | ResponseError): t is ResponseError {
  if ('error' in t) return true;

  return false;
}

export function _IsProfileSuccess(
  t: ResponseProfile
): t is ResponseProfileSuccess {
  if (!t) return false;

  if ('error' in t) return false;

  return !('loading' in t);
}
