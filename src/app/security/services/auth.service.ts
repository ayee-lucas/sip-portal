import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  AuthResponseErrorType,
  AuthResponseType
} from '../types/AuthResponseType';
import { ResponseAuthMock } from '../mocks/ResponseAuthMock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authResponse$ = new BehaviorSubject<
    AuthResponseType | AuthResponseErrorType
  >({ error: 'Unauthenticated' });
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  login(
    email: string,
    password: string
  ): Observable<AuthResponseType | AuthResponseErrorType> {
    if (email !== 'admin@admin' || password !== 'admin123') {
      this.authResponse$.next({ error: 'Invalid credentials' });
      return this.authResponse$;
    }

    const mockResponse = of(ResponseAuthMock);

    mockResponse.subscribe(res => {
      this.authResponse$.next(res);
      this.isLoggedIn$.next(true);
    });

    return this.authResponse$;
  }

  authStatus(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
