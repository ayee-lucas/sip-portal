import { Injectable } from '@angular/core';
import { User } from '../mocks/data';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import {
  ResponseError,
  ResponseUser
} from '../../admin/types/response-type-users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userResponse$ = new BehaviorSubject<ResponseUser>({ loading: true });
  private apiUrl = 'http://localhost:8082/sip-services/api';

  constructor(private http: HttpClient) {}

  init(params: Params): Observable<User[]> {
    const url = new URL(environment.SERVER_PATH.AUDIT);
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
    return this.http.get<User[]>(url.toString());
  }

  getAuditData(page: number, size: number): Observable<User[]> {
    const params = new HttpParams()
      .set('page', (page || 0).toString()) // Ensure page is defined and default to 0
      .set('size', (size || 5).toString()); // Ensure size is defined and default to 10
    const url = `${this.apiUrl}/audit`;

    return this.http.get<User[]>(url, { params: params });
  }
}
