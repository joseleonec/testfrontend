import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {
  
  clientes = [
    {
      clienteId: '1',
      nombres: 'Jose Lema',
      direccion: 'Otavalo sn y principal',
      telefono: '098254785',
      contrasena: '12345',
      estado: true
    },
    {
      clienteId: '2',
      nombres: 'Marianela Montalvo',
      direccion: 'Amazonas y NNUU',
      telefono: '097548965',
      contrasena: '56789',
      estado: true
    },
    {
      clienteId: '3',
      nombres: 'Juan Osorio',
      direccion: '13 junio y Equinoccial',
      telefono: '098874587',
      contrasena: '124578',
      estado: false
    }
  ];

  constructor(private router: Router) {}

  crearCliente() {
    this.router.navigate(['/clientes/create']);
  }

  editarCliente(cliente: any) {
    console.log('Editar cliente:', cliente);
    // Logic to navigate to edit page could go here
    // this.router.navigate(['/clientes/edit', cliente.clienteId]); 
  }

  eliminarCliente(id: string) {
    if(confirm('¿Está seguro de eliminar este cliente?')) {
        this.clientes = this.clientes.filter(c => c.clienteId !== id);
    }
  }

}
