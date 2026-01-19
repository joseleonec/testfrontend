import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteResponse } from '../models/reporte.dto';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {

    private apiUrl = `${environment.apiUrl}/reportes`;

    constructor(private http: HttpClient) { }

    getReporte(fechaInicio: string, fechaFin: string, clienteId: string): Observable<ReporteResponse> {
        const body = {
            clienteId: Number(clienteId),
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        };
        return this.http.post<ReporteResponse>(this.apiUrl, body);
    }
}
