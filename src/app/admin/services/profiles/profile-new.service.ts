import { Injectable } from '@angular/core';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ProfileRequestService } from './profile-request.service';
import { environment } from '../../../../environments/environment.development';
import { Profile } from '../../types/response-type-profiles';

@Injectable({
  providedIn: 'root'
})
export class ProfileNewService {
  private profileToAdd$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private profileRequestService: ProfileRequestService
  ) {}

  init(data: Profile) {
    const url = new URL(environment.SERVER_PATH.PROFILES);

    this.requestAddProfile(url.toString(), data);
  }

  private requestAddProfile(url: string, body: Profile) {
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
          detail: 'Profile added successfully'
        });

        this.profileRequestService.refresh();

        this.profileToAdd$.next(null);
      });
  }
}
