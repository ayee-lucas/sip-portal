import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/response-type-users';
import { AuditQueryService } from '../../query/services/audit-query.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {
  private userSelected$ = new BehaviorSubject<User | null>(null);

  constructor(private queryService: AuditQueryService) {}

  getUserSelected(): Observable<User | null> {
    return this.userSelected$;
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
