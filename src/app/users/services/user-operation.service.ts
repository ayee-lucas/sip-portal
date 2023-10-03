import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseUser } from '../types/response-type-users';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {
  private userResponse$ = new BehaviorSubject<ResponseUser>([]);

  init() {
    return this.userResponse$;
  }

  getUsers(): Observable<ResponseUser> {
    return this.userResponse$;
  }
}
