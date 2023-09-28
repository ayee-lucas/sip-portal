import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  setAuthStatus(status: boolean) {
    this.isLoggedIn$.next(status);
  }

  authStatus(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
