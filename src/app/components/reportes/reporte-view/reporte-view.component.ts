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

    this.reporteService.getReporte(fechaInicio, fechaFin, clienteId).subscribe({
      next: (data) => {
        this.reporteData = data;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error fetching reporte:', error);
        this.errorMessage = 'Error al generar el reporte.';
        this.isSubmitting = false;
      }
    });
  }
}
