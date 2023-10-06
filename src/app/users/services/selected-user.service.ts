import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/response-type-users';

@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {
  private userSelected$ = new BehaviorSubject<User | null>(null);

  getUserSelected(): Observable<User | null> {
    return this.userSelected$;
  }

  setUserSelected(user: User | null) {
    this.userSelected$.next(user);
  }
}
