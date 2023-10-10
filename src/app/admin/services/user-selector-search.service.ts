import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import {
  ResponseLoading,
  ResponseUserError,
  User
} from '../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserSelectorSearchService {
  private singleUser$ = new BehaviorSubject<
    User | ResponseUserError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  init(id: number) {
    const url = new URL(`${environment.SERVER_PATH.GET_USERS}/{id}`);

    url.searchParams.set('id', id.toString());

    this.requestUser(url.toString());
  }

  getUser(): Observable<User | ResponseUserError | ResponseLoading> {
    return this.singleUser$;
  }

  private requestUser(url: string) {
    this.http
      .get<User | ResponseUserError>(url)
      .pipe(
        catchError(err => {
          if ('error' in err) {
            const errorObj = err.error;

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorObj.error.description
            });

            return of(errorObj);
          }

          const data: ResponseUserError = {
            error: {
              errorCode: 0,
              errorType: 'FATAL_ERROR',
              code: 'FETCH_DATA_ERROR',
              description: 'Failed to retrieve data'
            }
          };

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return of(data);
        })
      )
      .subscribe(data => {
        this.singleUser$.next(data);
      });
  }
}
