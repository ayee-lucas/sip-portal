import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatusService } from '../../security/services/auth-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit {
  title = 'sip-portal';
  isLoggedIn$!: Observable<boolean>;

  constructor(private authStatusService: AuthStatusService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authStatusService.authStatus();
  }
}
