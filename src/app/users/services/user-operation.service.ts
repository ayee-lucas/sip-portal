import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ResponseUser, ResponseUserError } from '../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoadingSpinnerService } from '../../admin/services/loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {
  private userResponse$ = new BehaviorSubject<ResponseUser>({ loading: true });

  constructor(
    private http: HttpClient,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    this.loadingSpinnerService.setLoading(true);
  }

  init() {
    this.http
      .get<ResponseUser>(environment.SERVER_PATH.GET_USERS)
      .pipe(
        catchError(err => {
          console.log('Error: ', err);
          const data: ResponseUserError = {
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
        this.loadingSpinnerService.setLoading(false);
        this.userResponse$.next(data);
      });
  }

  getUsers(): Observable<ResponseUser> {
    return this.userResponse$;
  }

  refresh() {
    this.userResponse$.next({ loading: true });
  }
}
