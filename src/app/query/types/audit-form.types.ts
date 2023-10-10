import { FormControl } from '@angular/forms';

export type User = {
  identifier: string;
  date: string;
  entity: string;
  user: string;
  operation: string;
  id: number;
};

export type Audit = {
  content: User[];
  page: number;
  totalElements: number;
  totalPages: number;
};

export const mockAudit: Audit = {
  content: [],
  page: 0,
  totalElements: 30,
  totalPages: 2
};

export type AuditForm = {
  identifier: FormControl<string | null>;
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
  entity: FormControl<string | null>;
  email: FormControl<string | null>;
  operation: FormControl<string | null>;
  id: FormControl<string | null>;
};
