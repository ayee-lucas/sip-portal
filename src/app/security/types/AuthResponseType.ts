import { FormControl } from '@angular/forms';
export type AuthResponseType = {
  token: string;
  expiration: number;
  authorities: string[];
};

export type AuthResponseErrorType = {
  error: string;
};

export type LoginFormType = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};
