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

  authStatus(): Observable<boolean> {
    const { expiration, token } = this.cookieService.getAll();

    if (!expiration || !token) {
      this.cookieService.deleteAll();
      return this.isLoggedIn$;
    }

    const date = new Date(Number(expiration));

    const dateNow = new Date();

    if (dateNow > date) {
      this.resetStatus();

      return this.isLoggedIn$;
    }

    this.setAuthStatus(true);
    return this.isLoggedIn$;
  }

  logout() {
    this.cookieService.deleteAll();
    this.resetStatus();
  }

  private setAuthStatus(status: boolean) {
    this.isLoggedIn$.next(status);
  }

  private resetStatus() {
    this.cookieService.deleteAll();

    this.router.navigate([environment.ROUTE.security]);

    this.setAuthStatus(false);
  }
}
