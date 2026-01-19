import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrl = `${environment.apiUrl}/cuentas`;

  constructor(private http: HttpClient) { }

  create(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(this.apiUrl, cuenta);
  }

  getAll(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.apiUrl);
  }

  update(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.put<Cuenta>(`${this.apiUrl}/${cuenta.id}`, cuenta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
