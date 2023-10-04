import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private loading = new BehaviorSubject<boolean>(false);

  getLoading(): Observable<boolean> {
    return this.loading;
  }

  setLoading(value: boolean) {
    this.loading.next(value);
  }
}
