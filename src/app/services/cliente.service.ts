import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClienteResponse } from '../models/cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) { }

  create(cliente: any): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.apiUrl, cliente);
  }

  getAll(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(this.apiUrl);
  }

  update(cliente: any): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<ClienteResponse> {
      return this.http.get<ClienteResponse>(`${this.apiUrl}/${id}`);
  }
}
