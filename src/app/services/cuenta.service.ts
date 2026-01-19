import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cuenta } from '../models/cuenta.dto';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrl = 'http://localhost:8080/api/cuentas';
  
  private cuentas: Cuenta[] = [
    {
      id: 1,
      tipoCuenta: "Ahorro",
      numeroCuenta: "478758",
      saldoInicial: 2000,
      saldoDisponible: 2000,
      estado: "True",
      clienteId: 1
    },
    {
      id: 2,
      tipoCuenta: "Corriente",
      numeroCuenta: "225487",
      saldoInicial: 100,
      saldoDisponible: 100,
      estado: "True",
      clienteId: 2
    },
    {
      id: 3,
      tipoCuenta: "Ahorros",
      numeroCuenta: "495878",
      saldoInicial: 0,
      saldoDisponible: 0,
      estado: "True",
      clienteId: 3
    },
    {
      id: 4,
      tipoCuenta: "Ahorros",
      numeroCuenta: "496825",
      saldoInicial: 540,
      saldoDisponible: 540,
      estado: "True",
      clienteId: 2
    },
    {
      id: 5,
      tipoCuenta: "Corriente",
      numeroCuenta: "585545",
      saldoInicial: 1000,
      saldoDisponible: 1000,
      estado: "True",
      clienteId: 1
    }
  ];

  constructor(private http: HttpClient) { }

  create(cuenta: Cuenta): Observable<Cuenta> {
    const newId = this.cuentas.length > 0 ? (Math.max(...this.cuentas.map(c => c.id || 0)) + 1) : 1;
    const newCuenta = { ...cuenta, id: newId };
    this.cuentas.push(newCuenta);
    return of(newCuenta);
  }

  getAll(): Observable<Cuenta[]> {
    return of(this.cuentas);
  }

  update(cuenta: Cuenta): Observable<Cuenta> {
    const index = this.cuentas.findIndex(c => c.id === cuenta.id);
    if (index !== -1) {
      this.cuentas[index] = cuenta;
    }
    return of(cuenta);
  }

  delete(id: number): Observable<void> {
    this.cuentas = this.cuentas.filter(c => c.id !== id);
    return of(void 0);
  }
}
