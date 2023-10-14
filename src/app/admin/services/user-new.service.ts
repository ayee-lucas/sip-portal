import { Injectable } from '@angular/core';
import {
  ResponseError,
  ResponseLoading,
  User
} from '../types/response-type-users';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserRequestService } from './user-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserNewService {
  private userToAdd$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private operationService: UserRequestService
  ) {}

  init(data: User) {
    const url = new URL(environment.SERVER_PATH.USERS);

    this.requestAddUser(url.toString(), data);
  }

  private requestAddUser(url: string, body: User) {
    this.http
      .post(url, body)
      .pipe(
        catchError(err => {
          if ('error' in err) {
            return of(err.error);
          }

          const data: ResponseError = {
            error: {
              errorCode: 0,
              errorType: 'FATAL_ERROR',
              code: 'FETCH_DATA_ERROR',
              description: 'Failed to retrieve data'
            }
          };

          return of(data);
        })
      )
      .subscribe(data => {
        if (data && 'error' in data) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User added successfully'
        });

        this.operationService.refresh();

        this.userToAdd$.next(null);
      });
  }
}
