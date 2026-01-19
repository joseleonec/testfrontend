import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteResponse } from '../models/reporte.dto';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:8080/api/reportes';

  constructor(private http: HttpClient) { }

  getReporte(fechaInicio: string, fechaFin: string, clienteId: string): Observable<ReporteResponse> {
    // Postman shows POST /reportes for report generation in the details
    // But typically reports are GET with query params.
    // The previous analysis showed "reportes" item has "request": { "method": "POST" ... "body": {} ... }
    // but the response body is an array.
    // If it's POST, it likely sends criteria in body.
    // However, traditionally filter reports use GET or POST with body.
    // I'll assume POST based on collection, passing potential criteria if known, or just empty body if that's what Postman implies (Postman body seems empty `{}`).
    // But if it requires dates, they might be in query params in the Postman URL which were omitted.
    // Let's implement a POST with optional body/params structure.
    
    // NOTE: The Postman collection summary for Reportes shows:
    // "url": { /* Lines ... omitted */ }
    // It's possible the dates are query parameters even if it is a POST.
    
    let params = new HttpParams();
    if (fechaInicio) params = params.set('fechaInicio', fechaInicio);
    if (fechaFin) params = params.set('fechaFin', fechaFin);
    if (clienteId) params = params.set('clienteId', clienteId);

    return this.http.post<ReporteResponse>(this.apiUrl, {}, { params });
  }
}
