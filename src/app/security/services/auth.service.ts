import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import {
  AuthResponseErrorType,
  AuthResponseType
} from '../types/AuthResponseType';
import { ResponseAuthMock } from '../mocks/ResponseAuthMock';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthStatusService } from './auth-status.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authResponse$ = new BehaviorSubject<
    AuthResponseType | AuthResponseErrorType
  >({ error: 'Unauthenticated' });

  constructor(
    private cookieService: CookieService,
    private authStatus: AuthStatusService,
    private router: Router
  ) {}

  login(
    email: string,
    password: string
  ): Observable<AuthResponseType | AuthResponseErrorType> {
    if (email !== 'admin@admin' || password !== 'admin123') {
      this.authResponse$.next({ error: 'Invalid credentials' });
      return this.authResponse$;
    }

    const mockResponse = of(ResponseAuthMock);

    mockResponse
      .pipe(
        tap(res => {
          const date = new Date(res.expiration);

          this.cookieService.set('token', res.token, date);

          this.cookieService.set('expiration', res.expiration.toString(), date);

          this.cookieService.set(
            'authorities',
            JSON.stringify(res.authorities),
            date
          );

          this.authStatus.setAuthStatus(true);
          this.router.navigate(['']);
        })
      )
      .subscribe(res => {
        this.authResponse$.next(res);
      });

    return this.authResponse$;
  }
}
