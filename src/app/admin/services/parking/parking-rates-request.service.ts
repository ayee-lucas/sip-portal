import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseRates } from '../../types/response-type-response-rates';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParkingRatesRequestService {
  private rates$ = new BehaviorSubject<ResponseRates>({ loading: true });

  constructor(private http: HttpClient) {}
}
