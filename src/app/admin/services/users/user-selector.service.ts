import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../types/response-type-users';
import { QueryService } from '../../../query/services/query.service';

@Injectable({
  providedIn: 'root'
})
export class UserSelectorService {
  private userSelected$ = new BehaviorSubject<User | null>(null);

  constructor(private queryService: QueryService) {}

  getUserSelected(): Observable<User | null> {
    return this.userSelected$;
  }

  clearUserSelected() {
    this.userSelected$.next(null);
  }

  setUserSelected(user: User) {
    if (user) {
      this.queryService.updateParams({
        selected: user.userId,
        name: user.names,
        lastName: user.lastNames,
        email: user.email,
        status: user.status,
        profile: user.profileId
      });
    }

    this.userSelected$.next(user);
  }
}
