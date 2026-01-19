import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReporteResponse } from '../../../models/reporte.dto';
import { ReporteService } from '../../../services/reporte.service';

@Component({
  selector: 'app-reporte-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte-view.component.html',
  styleUrls: ['./reporte-view.component.css']
})
export class ReporteViewComponent {
  reporteForm: FormGroup;
  reporteData: ReporteResponse | null = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService
  ) {
    this.reporteForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      clienteId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reporteForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.reporteData = null;

    const { fechaInicio, fechaFin, clienteId } = this.reporteForm.value;

    console.log('Generating report (Simulation) for:', clienteId, fechaInicio, fechaFin);
    
    setTimeout(() => {
        // Hardcoded simulation data
        this.reporteData = [
            {
                cuenta: {
                    id: 2,
                    tipoCuenta: "Corriente",
                    numeroCuenta: "225487",
                    saldoDisponible: 700,
                    estado: "True"
                },
                movimientos: [
                    {
                        id: 2,
                        fecha: "2026-01-18T09:20:41.801552",
                        tipoMovimiento: "DEPOSITO",
                        valor: 600,
                        saldoInicial: 100,
                        saldo: 700,
                        cuentaId: 2
                    }
                ]
            },
            {
                cuenta: {
                    id: 4,
                    tipoCuenta: "Ahorros",
                    numeroCuenta: "496825",
                    saldoDisponible: 0,
                    estado: "True"
                },
                movimientos: [
                    {
                        id: 4,
                        fecha: "2026-01-18T09:21:00.039209",
                        tipoMovimiento: "RETIRO",
                        valor: -540,
                        saldoInicial: 540,
                        saldo: 0,
                        cuentaId: 4
                    }
                ]
            }
        ];
        this.isSubmitting = false;
    }, 1000);
  }
}
