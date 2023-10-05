import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// This service is meant to be deleted or be reused in the future to fetch filtered data from server

@Injectable({
  providedIn: 'root'
})
export class FilterUserService {
  private filterSubject = new Subject<string>();

  filterObservable = this.filterSubject.asObservable();

  applyFilter(filter: string) {
    this.filterSubject.next(filter);
  }
}
