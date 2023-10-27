import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ResponseError, ResponseUser } from '../../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Params } from '@angular/router';
import { QueryService } from '../../../query/services/query.service';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  private userResponse$ = new BehaviorSubject<ResponseUser>({ loading: true });

  constructor(
    private http: HttpClient,
    private queryService: QueryService
  ) {}

  init(params: Params) {
    const url = new URL(environment.SERVER_PATH.USERS);
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    this.requestUsers(url.toString());
  }

  getUsers(): Observable<ResponseUser> {
    return this.userResponse$;
  }

  refresh() {
    this.userResponse$.next({ loading: true });

    const params = this.queryService.getParams();

    this.init(params['params']);
  }

  private requestUsers(url: string) {
    this.http
      .get<ResponseUser>(url)
      .pipe(
        catchError(err => {
          console.log('Error: ', err);
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
        this.userResponse$.next(data);
      });
  }
}
