import { FormControl } from '@angular/forms';

export type AuditForm = {
  id: FormControl<string | null>;
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
  entity: FormControl<string | null>;
  email: FormControl<string | null>;
  operation: FormControl<string | null>;
  sub: FormControl<string | null>;
};
