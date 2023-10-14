import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { Profile } from '../../types/response-type-profiles';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectorSearchService {
  // Profile Observable
  /**
   * Profile BehaviorSubject to handle the profile state
   * Any subscriber will receive the last value emitted by the BehaviorSubject
   * Initializes with a loading state
   *
   * @private
   * @memberof ProfileSelectorSearchService
   */
  private singleProfile$ = new BehaviorSubject<
    Profile | ResponseError | ResponseLoading
  >({ loading: true });

  // Injecting the services to be used in the component
  /**
   * This method is called when the component is initialized
   * Only used for dependency injection
   *
   * @param http
   * @param messageService
   * @memberof ProfileSelectorSearchService
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // Init method
  /**
   * Initializes the profile request to the API
   * uses the param id to build the set the id param in the URL
   * as a query param and calls the requestProfile method
   *
   * @param id
   * @memberof ProfileSelectorSearchService
   */
  init(id: number) {
    const url = new URL(`${environment.SERVER_PATH.PROFILES}/{id}`);

    url.searchParams.set('id', id.toString());

    this.requestProfile(url.toString());
  }

  // Getters
  /**
   * Returns the profile observable to be used in the component
   * Returns either a Profile, ResponseError or ResponseLoading object
   *
   * @returns Observable
   * @memberof ProfileSelectorSearchService
   */
  getProfile(): Observable<Profile | ResponseError | ResponseLoading> {
    return this.singleProfile$;
  }

  // Request method
  /**
   * Makes the request to the API using the url param passed as argument by the init method.
   * subscribes to the request and handles the response, triggers the next method
   * of the BehaviorSubject to assign the response to the profile observable and any subscriber
   * will receive the last value emitted by the BehaviorSubject
   *
   * Handles the error response from the API and returns a ResponseError object,
   * when an error occurs the error is displayed in a toast message.
   *
   * @param url
   * @private
   * @memberof ProfileSelectorSearchService
   */
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
