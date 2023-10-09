import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  constructor(private TranslateService: TranslateService) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }
}
