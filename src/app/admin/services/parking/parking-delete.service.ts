import { Injectable } from '@angular/core';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ParkingRequestService } from './parking-request.service';
import { ParkingSelectorService } from './parking-selector.service';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingDeleteService {
  private response$ = new BehaviorSubject<
    ResponseLoading | ResponseError | null
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private parkingRequestService: ParkingRequestService,
    private parkingSelectorService: ParkingSelectorService
  ) {}

  deleteParking(id: number) {
    const url = new URL(`${environment.SERVER_PATH.PARKING}/{id}`);

    url.searchParams.set('id', id.toString());

    this.init(url.toString());
  }

  private init(url: string) {
    this.http
      .delete<null | ResponseError>(url)
      .pipe(
        catchError(err => {
          // If the server returns a ResponseError object, we return it.
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

        this.parkingSelectorService.clearParking();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Parking deleted successfully'
        });

        this.parkingRequestService.refresh();

        // We set the response$ BehaviorSubject to null, meaning we successfully deleted a profile.
        this.response$.next(null);
      });
  }
}
