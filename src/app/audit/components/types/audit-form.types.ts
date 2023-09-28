//types group en audit
export interface AuditForm {
  id: string | null;
  start: Date | null;
  end: Date | null;
  entity: string | null;
  email: string | null;
  operation: string | null;
  sub: string | null;
}
