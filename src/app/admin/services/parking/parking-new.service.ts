import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { MessageService } from 'primeng/api';
import { Parking } from '../../types/response-type-parking';
import { environment } from 'src/environments/environment.development';
import { ParkingRequestService } from './parking-request.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingNewService {
  private response$ = new BehaviorSubject<
    null | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private parkingRequestService: ParkingRequestService
  ) {}

  addParking(data: Parking) {
    const url = new URL(environment.SERVER_PATH.PARKING);

    this.init(url.toString(), data);
  }

  private init(url: string, body: Parking) {
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
          detail: 'Parking added successfully'
        });

        this.parkingRequestService.refresh();

        // We set the response$ BehaviorSubject to null, meaning we successfully created a profile.
        this.response$.next(null);
      });
  }
}
