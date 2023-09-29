import { FormControl } from '@angular/forms';

export type AuditForm = {
  identifier: FormControl<string | null>;
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
  entity: FormControl<string | null>;
  email: FormControl<string | null>;
  operation: FormControl<string | null>;
  id: FormControl<string | null>;
};
