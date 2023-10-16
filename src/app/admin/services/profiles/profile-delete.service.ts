import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { MessageService } from 'primeng/api';
import { ProfileRequestService } from './profile-request.service';
import { ProfileSelectorService } from './profile-selector.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileDeleteService {
  response$ = new BehaviorSubject<null | ResponseError | ResponseLoading>({
    loading: true
  });

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private profileRequestService: ProfileRequestService,
    private profileSelectorService: ProfileSelectorService
  ) {}

  deleteProfile(id: number) {
    const url = new URL(`${environment.SERVER_PATH.PROFILES}/{id}`);

    url.searchParams.set('id', id.toString());

    this.init(url.toString());
  }

  private init(url: string) {
    this.http
      .delete(url)
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
          this.response$.next(data);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.profileSelectorService.clearProfile();

        this.profileRequestService.refresh();

        this.response$.next(null);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile deleted successfully'
        });
      });
  }
}
