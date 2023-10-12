import {
  ResponseError,
  ResponseLoading,
  User
} from '../../admin/types/response-type-users';
import {
  Profile,
  ResponseProfile,
  ResponseProfileSuccess
} from '../../admin/types/response-type-profiles';

export function _isUser(t: User | ResponseError): t is User {
  if ('error' in t) return false;

  return t !== undefined && 'userId' in t;
}

export function _isUserResponseError(
  t: User | ResponseError
): t is ResponseError {
  return 'error' in t;
}

export function _isProfile(
  t: Profile | ResponseError | ResponseLoading
): t is Profile {
  return t !== undefined && 'profileId' in t;
}

export function _isProfileResponseError(
  t: Profile | ResponseError | ResponseLoading
): t is ResponseError {
  return 'error' in t;
}

export function _IsProfileSuccess(
  t: ResponseProfile
): t is ResponseProfileSuccess {
  if (!t) return false;

  if ('error' in t) return false;

  return !('loading' in t);
}
