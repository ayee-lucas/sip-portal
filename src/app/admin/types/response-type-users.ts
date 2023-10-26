import { ResponseContent } from './global-type';

export type ResponseUser =
  | ResponseUserSuccess
  | ResponseError
  | ResponseLoading;

export type ResponseError = {
  error: {
    errorCode: number;
    errorType: string;
    code: string;
    description: string;
  };
};

export type ResponseLoading = {
  loading: boolean;
};

export type ResponseUserSuccess = ResponseContent<User>;

export type User = {
  userId: number;
  names: string;
  lastNames: string;
  email: string;
  password?: string;
  status: boolean;
  profileId: number;
};
