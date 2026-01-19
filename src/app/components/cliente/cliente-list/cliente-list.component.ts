import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  
  clientes: any[] = [];

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getAll().subscribe(data => {
      this.clientes = data;
    });
  }

  crearCliente() {
    this.router.navigate(['/clientes/create']);
  }

  editarCliente(cliente: any) {
    console.log('Editar cliente:', cliente);
  }

  eliminarCliente(id: number) {
    if(confirm('¿Está seguro de eliminar este cliente?')) {
        this.clienteService.delete(id).subscribe(() => {
          this.loadClientes();
        });
    }
  }

}
