import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionSelectorService {
  private action$ = new BehaviorSubject<'update' | 'rates'>('update');

  getAction(): Observable<'update' | 'rates'> {
    return this.action$;
  }

  setAction(action: 'update' | 'rates') {
    this.action$.next(action);
  }
}
