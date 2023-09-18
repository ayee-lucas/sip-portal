import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class queryService {
  private apiUrl = 'URL_DE_LA_API';

  constructor(private http: HttpClient) {}

  buscarAuditorias(params: any): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: params,
    });

    return this.http.get(`${this.apiUrl}/ruta-de-busqueda`, {
      params: httpParams,
    });
  }
}
