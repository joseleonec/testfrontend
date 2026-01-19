import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteRequest, ClienteResponse } from '../models/cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes'; // Check BASE_URL, assuming /api/clientes

  constructor(private http: HttpClient) { }

  create(cliente: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.apiUrl, cliente);
  }

  getAll(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(this.apiUrl);
  }

  update(cliente: ClienteResponse): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(this.apiUrl, cliente);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`; // Assuming DELETE is by ID in path, though Postman summary omitted URL details, standard REST usage.
    // If DELETE uses query param or body, this needs adjustment. 
    // Postman summary shows: DELETE .../clientes?... or similar? 
    // Actually the summary for delete has "url": { ... } lines omitted.
    // Given the update uses PUT /clientes (likely with body), delete is likely /clientes/{id}
    return this.http.delete<void>(url);
  }
}
