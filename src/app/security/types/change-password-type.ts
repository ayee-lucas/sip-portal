import { FormControl } from '@angular/forms';

export type ChangePasswordData = {
    email: FormControl<string | null>;
    verificationCode: FormControl<string | null>;
    newPassword: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  };
  