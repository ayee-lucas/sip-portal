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

/**
 * ProfileDeleteService handles the deletion request of a profile.
 * @class ProfileDeleteService
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileDeleteService {
  /**
   * response$ is a BehaviorSubject that holds the response of the request
   * any subscriber will be notified of the changes.
   * @private
   */
  private response$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({
    loading: true
  });

  /**
   * Injects the dependencies needed for this service.
   *
   * @param http Used to make the http request.
   * @param messageService Used to display messages, provided by PrimeNg UI library.
   * @param profileRequestService Used to refresh the profile list.
   * @param profileSelectorService Used to clear the selected profile.
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private profileRequestService: ProfileRequestService,
    private profileSelectorService: ProfileSelectorService
  ) {}

  /**
   * This method is used to call the init method to make the http request for deleting the profile
   * is meant to be called from the component consuming this service.
   * @param id The id of the profile to be deleted.
   * @public
   * @memberof ProfileDeleteService
   */
  deleteProfile(id: number) {
    const url = new URL(`${environment.SERVER_PATH.PROFILES}/{id}`);

    url.searchParams.set('id', id.toString());

    this.init(url.toString());
  }

  /**
   * This method is used to handle the http request for deleting the profile and
   * set the state of the response$ BehaviorSubject.
   * It also handles the error response and displays a message to the user.
   * @param url The url to make the http request.
   * @private
   * @memberof ProfileDeleteService
   */
  private init(url: string) {
    this.http
      .delete(url)
      .pipe(
        catchError(err => {
          // If the server returns a ResponseError object, we return it.
          if ('error' in err) {
            const errorObj = err.error;

            return of(errorObj);
          }

          // If the server fails in returning a ResponseError object, we create one.
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
        // If the server returns a ResponseError object, we set the response$ BehaviorSubject
        if (data && 'error' in data) {
          this.response$.next(data);

          // We display a message to the user.
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
