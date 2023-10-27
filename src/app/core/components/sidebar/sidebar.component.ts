import { Component } from '@angular/core';
import { AuthStatusService } from '../../../security/services/auth-status.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  mobileMenuVisible = false;

  constructor(
    private authStatusService: AuthStatusService,
    private TranslateService: TranslateService
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }

  toggleSidebar() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  logout() {
    this.authStatusService.logout();
  }
}
