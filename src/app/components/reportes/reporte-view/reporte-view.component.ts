import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteResponse } from '../../../models/reporte.dto';
import { ReporteService } from '../../../services/reporte.service';
import { ReporteSearchComponent } from '../reporte-search/reporte-search.component';

@Component({
  selector: 'app-reporte-view',
  standalone: true,
  imports: [CommonModule, ReporteSearchComponent],
  templateUrl: './reporte-view.component.html',
  styleUrls: ['./reporte-view.component.css']
})
export class ReporteViewComponent {
  reporteData: ReporteResponse | null = null;
  errorMessage = '';
  isLoading = false;

  constructor(
    private reporteService: ReporteService
  ) {}

  onSearch(criteria: {fechaInicio: string, fechaFin: string, clienteId: string}): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.reporteData = null; // Clear previous results

    console.log('Generating report for:', criteria.clienteId, criteria.fechaInicio, criteria.fechaFin);
    
    this.reporteService.getReporte(criteria.fechaInicio, criteria.fechaFin, criteria.clienteId).subscribe({
      next: (data) => {
        this.reporteData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching reporte:', error);
        this.errorMessage = 'Error al generar el reporte.';
        this.isLoading = false;
      }
    });
  }

  clearReport(): void {
    this.reporteData = null;
    this.errorMessage = '';
  }
}
