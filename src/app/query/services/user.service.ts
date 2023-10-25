import { Injectable } from '@angular/core';
import { mockUsers, User } from '../mocks/data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/sip-services/api';

  constructor(private http: HttpClient) {}

  getAuditData(page: number, size: number): Observable<User[]> {
    const parametros = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    const url = `http://localhost:8082/sip-services/api/audit`;
    return this.http.get<User[]>(url, { params: parametros });
  }
}
