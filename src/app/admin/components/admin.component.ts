import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'sip-portal';
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.authStatus();
  }
}
