import { Injectable } from '@angular/core';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../types/response-type-profiles';
import { environment } from '../../../../environments/environment.development';
import { MessageService } from 'primeng/api';
import { ProfileRequestService } from './profile-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  private profileToUpdate$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private profileRequestService: ProfileRequestService,
    private messageService: MessageService
  ) {}

  init(data: Profile) {
    const url = new URL(`${environment.SERVER_PATH.PROFILES}/{id}`);

    const id = data.profileId;

    url.searchParams.set('id', id.toString());

    this.requestUpdateUser(url.toString(), data);
  }

  private requestUpdateUser(url: string, body: Profile) {
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
          this.profileToUpdate$.next(data);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.profileRequestService.refresh();

        this.profileToUpdate$.next(null);
      });
  }
}
