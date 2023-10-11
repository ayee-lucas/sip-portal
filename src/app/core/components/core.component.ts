import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatusService } from '../../security/services/auth-status.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit {
  title = 'sip-portal';
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private authStatusService: AuthStatusService,
    private TranslateService: TranslateService
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authStatusService.authStatus();
  }
}