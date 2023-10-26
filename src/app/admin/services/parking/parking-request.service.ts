import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { ResponseParking } from '../../types/response-type-parking';
import { HttpClient } from '@angular/common/http';
import { ResponseError } from '../../types/response-type-users';
import { MessageService } from 'primeng/api';
import { Params } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParkingRequestService {
  private parkings$ = new BehaviorSubject<ResponseParking>({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  init(params: Params) {
    const url = new URL(environment.SERVER_PATH.PARKING);

    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    this.requestParking(url.toString());
  }

  getParkings(): Observable<ResponseParking> {
    return this.parkings$;
  }

  private requestParking(url: string) {
    this.http
      .get<ResponseParking>(url)
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
        if ('error' in data) {
          this.parkings$.next(data);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error.description
          });

          return;
        }

        this.parkings$.next(data);
      });
  }
}
