import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movimiento } from '../models/movimiento.dto';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = 'http://localhost:8080/api/movimientos';

  private movimientos: Movimiento[] = [
    {
      id: 1,
      fecha: "2026-01-18T09:20:39.3082095",
      tipoMovimiento: "RETIRO",
      valor: -575,
      saldoInicial: 2000,
      saldo: 1425,
      cuentaId: 1
    },
    {
      id: 2,
      fecha: "2026-01-18T09:20:41.8015524",
      tipoMovimiento: "DEPOSITO",
      valor: 600,
      saldoInicial: 100,
      saldo: 700,
      cuentaId: 2
    },
    {
      id: 3,
      fecha: "2026-01-18T09:20:47.0571055",
      tipoMovimiento: "DEPOSITO",
      valor: 150,
      saldoInicial: 0,
      saldo: 150,
      cuentaId: 3
    },
    {
      id: 4,
      fecha: "2026-01-18T09:21:00.0392086",
      tipoMovimiento: "RETIRO",
      valor: -540,
      saldoInicial: 540,
      saldo: 0,
      cuentaId: 4
    }
  ];

  constructor(private http: HttpClient) { }

  create(movimiento: Movimiento): Observable<Movimiento> {
     // Generate ID and simulate persistence
     const newId = this.movimientos.length > 0 ? (Math.max(...this.movimientos.map(m => m.id || 0)) + 1) : 1;
     const newMovimiento = { ...movimiento, id: newId, fecha: new Date().toISOString() };
     
     // Note: In a real app, backend calculates saldo based on previous saldo. 
     // Here we just save what is sent or basic emulation if needed.
     // For now, just pushing what we get plus ID/Date.
     this.movimientos.push(newMovimiento);
     
     return of(newMovimiento);
  }

  getAll(): Observable<Movimiento[]> {
    return of(this.movimientos);
  }

  update(movimiento: Movimiento): Observable<Movimiento> {
    const index = this.movimientos.findIndex(m => m.id === movimiento.id);
    if (index !== -1) {
      this.movimientos[index] = movimiento;
    }
    return of(movimiento);
  }

  delete(id: number): Observable<void> {
    this.movimientos = this.movimientos.filter(m => m.id !== id);
    return of(void 0);
  }
}
