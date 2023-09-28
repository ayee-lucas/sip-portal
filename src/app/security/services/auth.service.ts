import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import {
  AuthResponseErrorType,
  AuthResponseType
} from '../types/AuthResponseType';
import { ResponseAuthMock } from '../mocks/ResponseAuthMock';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authResponse$ = new BehaviorSubject<
    AuthResponseType | AuthResponseErrorType
  >({ error: 'Unauthenticated' });

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService) {}

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
          this.cookieService.set('token', res.token);
          this.isLoggedIn$.next(true);
        })
      )
      .subscribe(res => {
        this.authResponse$.next(res);
      });

    return this.authResponse$;
  }

  authStatus(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
