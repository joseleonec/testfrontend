import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Cuenta } from '../../../models/cuenta.dto';
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cuenta-list.component.html',
  styleUrl: './cuenta-list.component.css'
})
export class CuentaListComponent implements OnInit {
  cuentas: Cuenta[] = [];

  constructor(private cuentaService: CuentaService, private router: Router) {}

  ngOnInit(): void {
    this.loadCuentas();
  }

  loadCuentas() {
    this.cuentaService.getAll().subscribe(data => {
      this.cuentas = data;
    });
  }

  crearCuenta() {
    this.router.navigate(['/cuentas/create']);
  }

  eliminarCuenta(id: number) {
     if(confirm('¿Está seguro de eliminar esta cuenta?')) {
        this.cuentaService.delete(id).subscribe(() => {
          this.loadCuentas();
        });
    }
  }
    
  editarCuenta(cuenta: Cuenta) {
      console.log('Edit', cuenta);
  }
}
