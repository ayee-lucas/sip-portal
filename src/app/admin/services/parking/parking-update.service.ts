import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { ParkingRequestService } from './parking-request.service';
import { MessageService } from 'primeng/api';
import { Parking } from '../../types/response-type-parking';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParkingUpdateService {
  private response$ = new BehaviorSubject<
    ResponseLoading | ResponseError | null
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private parkingRequestService: ParkingRequestService,
    private messageService: MessageService
  ) {}

  init(data: Parking) {
    const url = new URL(`${environment.SERVER_PATH.PARKING}/{id}`);

    const id = data.parkingId;

    url.searchParams.set('id', id.toString());

    this.requestUpdateParking(url.toString(), data);
  }

  private requestUpdateParking(url: string, body: Parking) {
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
          this.response$.next(data);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.parkingRequestService.refresh();

        this.response$.next(null);
      });
  }
}
