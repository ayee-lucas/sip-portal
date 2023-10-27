import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Parking } from '../../types/response-type-parking';
import { QueryService } from 'src/app/query/services/query.service';
import { ParkingGetByIdService } from './parking-get-by-id.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingSelectorService {
  private parkingSelected$ = new BehaviorSubject<Parking | null>(null);

  constructor(
    private queryService: QueryService,
    private parkingeGetByIdService: ParkingGetByIdService
  ) {}

  getParking(): Observable<Parking | null> {
    return this.parkingSelected$;
  }

  clearParking() {
    this.parkingSelected$.next(null);
  }

  setSelectedParking(id: number) {
    if (!id) {
      return;
    }

    this.parkingeGetByIdService
      .getParking()
      .pipe(
        map(res => {
          if ('error' in res) {
            return null;
          }

          if ('loading' in res) {
            return null;
          }

          return res as Parking | null;
        })
      )
      .subscribe(data => {
        if (data && data.parkingId) {
          this.queryService.updateParams({
            selected: data.parkingId,
            code: data.code,
            name: data.name,
            address: data.address,
            manager: data.manager,
            phone: data.phone,
            status: data.status
          });

          this.parkingSelected$.next(data);

          return;
        }

        this.parkingSelected$.next(null);
      });

    this.parkingeGetByIdService.init(id);
  }
}
