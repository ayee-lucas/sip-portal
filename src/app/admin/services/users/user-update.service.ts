import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading,
  User
} from '../../types/response-type-users';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserRequestService } from './user-request.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {
  private userToUpdate$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private userOperationService: UserRequestService,
    private messageService: MessageService
  ) {}

  init(data: User) {
    const url = new URL(`${environment.SERVER_PATH.USERS}/{id}`);

    const id = data.userId;

    url.searchParams.set('id', id.toString());

    this.requestUpdateUser(url.toString(), data);
  }

  private requestUpdateUser(url: string, body: User) {
    this.http
      .put<null | ResponseError>(url, body)
      .pipe(
        catchError(err => {
          if ('error' in err) {
            const errorObj = err.error;

            return of(errorObj);
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
          this.userToUpdate$.next(data);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.userOperationService.refresh();

        this.userToUpdate$.next(null);
      });
  }
}
