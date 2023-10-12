import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ResponseError, ResponseLoading } from '../types/response-type-users';
import { Profile } from '../types/response-type-profiles';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectorSearchService {
  private singleProfile$ = new BehaviorSubject<
    Profile | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  init(id: number) {
    const url = new URL(`${environment.SERVER_PATH.PROFILES}/{id}`);

    url.searchParams.set('id', id.toString());

    this.requestProfile(url.toString());
  }

  getProfile(): Observable<Profile | ResponseError | ResponseLoading> {
    return this.singleProfile$;
  }

  private requestProfile(url: string) {
    this.http
      .get<Profile | ResponseError>(url)
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
          const data: ResponseError = {
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
        this.singleProfile$.next(data);
      });
  }
}
