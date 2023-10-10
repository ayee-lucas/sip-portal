import { Component } from '@angular/core';
import { AuthStatusService } from '../../../security/services/auth-status.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(
    private authStatusService: AuthStatusService,
    private TranslateService: TranslateService
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }

  logout() {
    this.authStatusService.logout();
  }
}
