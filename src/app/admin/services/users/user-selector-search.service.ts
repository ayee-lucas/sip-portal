import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading,
  User
} from '../../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserSelectorSearchService {
  // User Observable
  /**
   * User BehaviorSubject to handle the user state
   * Any subscriber will receive the last value emitted by the BehaviorSubject
   * Initializes with a loading state
   *
   * @private
   * @memberof UserSelectorSearchService
   */
  private singleUser$ = new BehaviorSubject<
    User | ResponseError | ResponseLoading
  >({ loading: true });

  // Injecting the services to be used in the component
  /**
   * This method is called when the component is initialized
   * Only used for dependency injection
   *
   * @param http
   * @param messageService
   * @memberof UserSelectorSearchService
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // Init method
  /**
   * Initializes the user request to the API
   * uses the param id to build the set the id param in the URL
   * as a query param and calls the requestUser method
   *
   * @param id
   * @memberof UserSelectorSearchService
   */
  init(id: number) {
    const url = new URL(`${environment.SERVER_PATH.USERS}/{id}`);

    url.searchParams.set('id', id.toString());

    this.requestUser(url.toString());
  }

  // Getters
  /**
   * Returns the user observable to be used in the component
   * Returns either a User, ResponseError or ResponseLoading object
   *
   * @returns Observable
   * @memberof UserSelectorSearchService
   */
  getUser(): Observable<User | ResponseError | ResponseLoading> {
    return this.singleUser$;
  }

  // Request method
  /**
   * Makes the request to the API using the url param passed as argument by the init method.
   * subscribes to the request and handles the response, triggers the next method
   * of the BehaviorSubject to assign the response to the user observable and any subscriber
   * will receive the last value emitted by the BehaviorSubject
   *
   * Handles the error response from the API and returns a ResponseError object,
   * when an error occurs the error is displayed in a toast message.
   *
   * @param url
   * @private
   * @memberof UserSelectorSearchService
   */
  private requestUser(url: string) {
    this.http
      .get<User | ResponseError>(url)
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
        this.singleUser$.next(data);
      });
  }
}
