import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ClienteRequest, ClienteResponse } from '../models/cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  // In-memory data
  private clientes: any[] = [
    {
      clienteId: '1',
      nombres: 'Jose Lema',
      direccion: 'Otavalo sn y principal',
      telefono: '098254785',
      contrasena: '12345',
      estado: true,
      identificacion: '1234567890',
      genero: 'Masculino',
      edad: 30
    },
    {
      clienteId: '2',
      nombres: 'Marianela Montalvo',
      direccion: 'Amazonas y NNUU',
      telefono: '097548965',
      contrasena: '56789',
      estado: true,
       identificacion: '0987654321',
      genero: 'Femenino',
      edad: 25
    },
    {
      clienteId: '3',
      nombres: 'Juan Osorio',
      direccion: '13 junio y Equinoccial',
      telefono: '098874587',
      contrasena: '124578',
      estado: false,
       identificacion: '1122334455',
      genero: 'Masculino',
      edad: 40
    }
  ];

  constructor(private http: HttpClient) { }

  create(cliente: any): Observable<any> {
    // Determine new ID (simple numeric increment)
    const newId = (this.clientes.length + 1).toString();
    const newCliente = { ...cliente, clienteId: newId, id: newId }; // Ensure ID is set
    this.clientes.push(newCliente);
    return of(newCliente);
  }

  getAll(): Observable<any[]> {
    return of(this.clientes);
  }

  update(cliente: any): Observable<any> {
    const index = this.clientes.findIndex(c => c.clienteId === cliente.clienteId);
    if (index !== -1) {
      this.clientes[index] = cliente;
    }
    return of(cliente);
  }

  delete(id: string): Observable<void> {
    this.clientes = this.clientes.filter(c => c.clienteId !== id);
    return of(void 0);
  }
}
