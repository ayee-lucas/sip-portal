import { Injectable } from '@angular/core';
import { mockUsers, User } from '../mocks/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable<User[]> {
    const users = of(mockUsers.content);

    return users;
  }
}
