import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html'
})
export class PasswordRecoveryComponent {
  constructor(
    private TranslateService: TranslateService,
    private router: Router
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }
  goToChangePassword() {
    this.router.navigate(['auth/change']);
  }
}
