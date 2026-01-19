import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteResponse } from '../../../models/reporte.dto';
import { ReporteSearchComponent } from '../reporte-search/reporte-search.component';
import { ReporteService } from '../../../services/reporte.service';

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
  searchCriteria: {fechaInicio: string, fechaFin: string, clienteId: string} | null = null;

  constructor(
    private reporteService: ReporteService
  ) {}

  onSearch(criteria: {fechaInicio: string, fechaFin: string, clienteId: string}): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.reporteData = null; // Clear previous results
    this.searchCriteria = criteria;

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
    this.searchCriteria = null;
  }

  printReport(): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const clienteName = this.reporteData && this.reporteData.length > 0 
      ? this.reporteData[0].cuenta.nombreCliente 
      : 'N/A';
    
    const rangeText = this.searchCriteria 
      ? `Periodo: ${this.searchCriteria.fechaInicio} a ${this.searchCriteria.fechaFin}` 
      : '';

    let contentHtml = `
      <html>
      <head>
        <title>Reporte Financiero - ${clienteName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
          h2 { text-align: center; margin-bottom: 5px; }
          h3 { text-align: center; color: #555; margin-top: 0; margin-bottom: 5px; }
          .date-range { text-align: center; color: #777; margin-bottom: 30px; font-size: 0.9em; }
          .account-card { border: 1px solid #ddd; padding: 20px; margin-bottom: 30px; border-radius: 8px; page-break-inside: avoid; }
          h4 { margin-top: 0; margin-bottom: 10px; color: #333; font-size: 1.1em; }
          p { margin: 5px 0 15px 0; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9em; }
          th, td { border-bottom: 1px solid #eee; padding: 10px; text-align: left; }
          th { background-color: #f9f9f9; font-weight: 600; color: #555; border-bottom: 2px solid #eee; }
          tr:hover { background-color: #fcfcfc; }
          .text-center { text-align: center; font-style: italic; color: #999; }
          
          @media print {
            body { padding: 0; }
            .account-card { border: none; border-bottom: 1px solid #ccc; border-radius: 0; padding: 10px 0; }
            th { background-color: #eee !important; -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <h2>Estado de Cuenta</h2>
        <h3>Cliente: ${clienteName}</h3>
        <div class="date-range">${rangeText}</div>
    `;

    this.reporteData?.forEach(item => {
      contentHtml += `
        <div class="account-card">
          <h4>Cuenta: ${item.cuenta.numeroCuenta} (${item.cuenta.tipoCuenta})</h4>
          <p>Saldo Disponible: ${item.cuenta.saldoDisponible}</p>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Saldo Inicial</th>
                <th>Valor</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      if (item.movimientos.length === 0) {
         contentHtml += `<tr><td colspan="5" class="text-center">No hay movimientos en este periodo.</td></tr>`;
      } else {
        item.movimientos.forEach(mov => {
           // Simple date formatting
           const date = new Date(mov.fecha).toLocaleString();
           contentHtml += `
             <tr>
               <td>${date}</td>
               <td>${mov.tipoMovimiento}</td>
               <td>${mov.saldoInicial}</td>
               <td>${mov.valor}</td>
               <td>${mov.saldo}</td>
             </tr>
           `;
        });
      }

      contentHtml += `
            </tbody>
          </table>
        </div>
      `;
    });

    contentHtml += `
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(contentHtml);
    printWindow.document.close();
  }
}

