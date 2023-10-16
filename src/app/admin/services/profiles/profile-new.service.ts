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

/**
 * ### ProfileNewService handles the request for adding a new profile.
 * @description Provides in Root of the application.
 * @class ProfileNewService
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileNewService {
  /**
   * response$ is a BehaviorSubject that holds the response of the request
   * any subscriber will be notified of the changes.
   * @description Used to handle the state of the update request.
   * @private
   * @memberof ProfileNewService
   */
  private response$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({ loading: true });

  /**
   * Injects the dependencies needed for this service.
   *
   * @param http Used to make the http request.
   * @param messageService Used to display messages, provided by PrimeNg UI library.
   * @param profileRequestService Used to refresh the profile list.
   * @memberof ProfileNewService
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private profileRequestService: ProfileRequestService
  ) {}

  /**
   * This method is used to call the init method to make the http request for adding the profile
   * is meant to be called from the component consuming this service.
   * @param data The body of the profile to be provided in the request.
   * @memberof ProfileNewService
   */
  addProfile(data: Profile) {
    const url = new URL(environment.SERVER_PATH.PROFILES);

    this.init(url.toString(), data);
  }

  /**
   * This method is used to call the init method to make the http request for adding the profile and
   * set the state of the response$ BehaviourSubject.
   * @param url The url to make the request.
   * @param body The body of the profile to be provided in the request.
   * @private
   */
  private init(url: string, body: Profile) {
    this.http
      .post(url, body)
      .pipe(
        catchError(err => {
          // if the server returns a ResponseError object, we return it.
          if ('error' in err) {
            return of(err.error);
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
        // if the data is a ResponseError object, we display the error message.
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

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile added successfully'
        });

        this.profileRequestService.refresh();

        // We set the response$ BehaviorSubject to null, meaning we successfully created a profile.
        this.response$.next(null);
      });
  }
}
