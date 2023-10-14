import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ResponseProfile } from '../types/response-type-profiles';
import { HttpClient } from '@angular/common/http';
import { QueryService } from '../../query/services/query.service';
import { Params } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { ResponseError } from '../types/response-type-users';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProfileRequestService {
  private profiles$ = new BehaviorSubject<ResponseProfile>({ loading: true });

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private meessageService: MessageService
  ) {}

  init(params: Params) {
    const url = new URL(environment.SERVER_PATH.PROFILES);

    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    this.requestProfiles(url.toString());
  }

  getProfiles(): Observable<ResponseProfile> {
    return this.profiles$;
  }

  refresh() {
    this.profiles$.next({ loading: true });

    const params = this.queryService.getParams();

    this.init(params['params']);
  }

  private requestProfiles(url: string) {
    this.http
      .get<ResponseProfile>(url)
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
        if ('error' in data) {
          this.meessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          this.profiles$.next(data);

          return;
        }

        this.profiles$.next(data);
      });
  }
}
