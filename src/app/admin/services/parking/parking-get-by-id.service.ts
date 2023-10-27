import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import {
  ResponseError,
  ResponseLoading
} from '../../types/response-type-users';
import { Parking } from '../../types/response-type-parking';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Profile } from '../../types/response-type-profiles';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParkingGetByIdService {
  private singleParking$ = new BehaviorSubject<
    Parking | ResponseError | ResponseLoading
  >({ loading: true });

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  init(id: number) {
    const url = new URL(`${environment.SERVER_PATH.PARKING}/{id}`);

    url.searchParams.set('id', id.toString());

    this.reqeuestParking(url.toString());
  }

  getParking(): Observable<Parking | ResponseError | ResponseLoading> {
    return this.singleParking$;
  }

  private reqeuestParking(url: string) {
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
        this.singleParking$.next(data);
      });
  }
}
