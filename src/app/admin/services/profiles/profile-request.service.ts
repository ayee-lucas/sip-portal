import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ResponseProfile } from '../../types/response-type-profiles';
import { HttpClient } from '@angular/common/http';
import { QueryService } from '../../../query/services/query.service';
import { Params } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { ResponseError } from '../../types/response-type-users';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
/**
 * ### ProfileRequestService handles the request for retrieving the profiles.
 * @description Provides in Root of the application.
 * @class ProfileRequestService
 */
export class ProfileRequestService {
  /**
   *  profiles$ is a BehaviorSubject that holds the response of the request
   *  any subscriber will be notified of the changes.
   *  @description Used to handle the state of the request.
   *  @private
   *  @memberof ProfileRequestService
   */
  private profiles$ = new BehaviorSubject<ResponseProfile>({ loading: true });

  /**
   * Injects the dependencies needed for this service.
   * @param http Used to make the http request.
   * @param queryService Used to handle the query params.
   * @param messageService Used to display messages, provided by PrimeNg UI library.
   * @memberof ProfileRequestService
   */
  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private messageService: MessageService
  ) {}

  /**
   * This method is used to initialize the request for retrieving the profiles.
   * @description It is meant to be called from the component consuming this service.
   * @param params Takes the query params object to be added to the url for the request.
   * @memberof ProfileRequestService
   */
  init(params: Params) {
    const url = new URL(environment.SERVER_PATH.PROFILES);

    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    this.requestProfiles(url.toString());
  }

  /**
   * This method is used to retrieve the profiles$ BehaviorSubject.
   * @description It is meant to be called from the component consuming this service.
   * @returns {Observable<ResponseProfile>} profiles$ BehaviorSubject as an Observable
   * so the component can subscribe to it and not access the next method.
   * @memberof ProfileRequestService
   */
  getProfiles(): Observable<ResponseProfile> {
    return this.profiles$;
  }

  /**
   * This method is used to refresh the profiles$ BehaviorSubject.
   * @description It is meant to be called from the component consuming this service,
   * when the profile list is needs to be refreshed.
   * @memberof ProfileRequestService
   */
  refresh() {
    this.profiles$.next({ loading: true });

    const params = this.queryService.getParams();

    this.init(params['params']);
  }

  /**
   * This method is used to make the http request for retrieving the profiles
   * @description It handles the response of the request and sets the state of the profiles$ BehaviorSubject.
   * @param url The url to make the request.
   * @private
   * @memberof ProfileRequestService
   */
  private requestProfiles(url: string) {
    this.http
      .get<ResponseProfile>(url)
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
        if ('error' in data) {
          this.profiles$.next(data);

          // We display a message to the user.
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.profiles$.next(data);
      });
  }
}
