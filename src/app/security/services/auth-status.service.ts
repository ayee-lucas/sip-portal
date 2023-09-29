import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  setAuthStatus(status: boolean) {
    this.isLoggedIn$.next(status);
  }

  authStatus(): Observable<boolean> {
    const expiration = this.cookieService.get('expiration');

    if (!expiration) {
      this.cookieService.deleteAll();
    }

    return this.isLoggedIn$;
  }
}
