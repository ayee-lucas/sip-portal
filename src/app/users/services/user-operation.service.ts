import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ResponseUser, ResponseUserError } from '../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoadingSpinnerService } from '../../admin/services/loading-spinner.service';
import { AuditQueryService } from '../../query/services/audit-query.service';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {
  private userResponse$ = new BehaviorSubject<ResponseUser>({ loading: true });

  constructor(
    private http: HttpClient,
    private loadingSpinnerService: LoadingSpinnerService,
    private queryService: AuditQueryService
  ) {
    this.loadingSpinnerService.setLoading(true);
  }

  init() {
    const url = new URL(environment.SERVER_PATH.GET_USERS);

    const params = this.queryService.getParams();

    if (!params['params'].page || !params['params'].size) {
      this.queryService.updateParams({ page: 1, size: 10 });
    }

    Object.keys(params['params']).forEach(key => {
      url.searchParams.append(key, params['params'][key]);
    });

    const page = url.searchParams.get('page');

    if (page) {
      url.searchParams.set('page', (+page - 1).toString());
    }

    this.http
      .get<ResponseUser>(url.toString())
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
