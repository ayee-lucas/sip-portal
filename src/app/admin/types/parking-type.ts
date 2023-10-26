import { FormControl } from '@angular/forms';

export type ParkingForm = {
  code: FormControl<number | null>;
  name: FormControl<string | null>;
  address: FormControl<string | null>;
  phone: FormControl<number | null>;
  manager: FormControl<string | null>;
  status: FormControl<boolean | null>;
};
