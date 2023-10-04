import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatusService } from '../../security/services/auth-status.service';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'sip-portal';
  isLoggedIn$!: Observable<boolean>;
  isLoding$!: Observable<boolean>;

  constructor(
    private authStatusService: AuthStatusService,
    private loadingSpinnerServce: LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authStatusService.authStatus();
    this.isLoding$ = this.loadingSpinnerServce.getLoading();
  }
}
