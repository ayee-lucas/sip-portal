export type AuthResponseType = {
  token: string;
  expiration: number;
  authorities: string[];
};

export type AuthResponseErrorType = {
  error: string;
};
