import { ResponseContent } from './global-type';
import { ResponseError, ResponseLoading } from './response-type-users';

export type ResponseProfile =
  | ResponseProfileSuccess
  | ResponseError
  | ResponseLoading;

export type Profile = {
  profileId: number;
  name: string;
  description_profile: string;
  resources?: ['ROLE_PROFILES' | 'ROLE_USERS' | 'ROLE_AUDIT'];
  status: boolean;
};

export type ResponseProfileSuccess = ResponseContent<Profile>;
