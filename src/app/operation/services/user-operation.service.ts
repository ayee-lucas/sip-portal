import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  ResponseOperation,
  ResponseOperationError,
  ResponseOperationUser
} from '../types/response-type-operation';
import { operationUserMock } from '../mocks/operation-user-mock';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {
  private userResponse$ = new BehaviorSubject<
    ResponseOperation | ResponseOperationError
  >({ error: 'No users yet' });

  init() {
    // This BehaviorSubject will be used to mock the data coming from the API
    // Delete this BehaviorSubject when api is ready
    const mockData = new BehaviorSubject(operationUserMock);

    mockData.subscribe(data => {
      this.userResponse$.next(data);
    });
  }

  getUsers(): Observable<ResponseOperationUser[]> {
    return this.userResponse$.pipe(
      map(res => {
        if ('error' in res) {
          return [];
        }

        return res.content;
      })
    );
  }
}
