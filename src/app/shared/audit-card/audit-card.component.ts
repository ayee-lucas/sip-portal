import { Component, Input } from '@angular/core';

interface AuditInfo {
  UserCreated: string;
  DateCreated: string;
  UserUpdated: string;
  DateUpdated: string;
}

@Component({
  selector: 'app-audit-card',
  templateUrl: './audit-card.component.html',
  styleUrls: ['./audit-card.component.scss']
})
export class AuditCardComponent {
  @Input() auditData: AuditInfo;

  constructor() {
    this.auditData = {
      UserCreated: '',
      DateCreated: '',
      UserUpdated: '',
      DateUpdated: ''
    };
  }

  // Agrega la función closeCard
  closeCard() {
    // Lógica para cerrar el componente aquí (por ejemplo, emitir un evento)
  }
}
