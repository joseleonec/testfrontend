import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { ReporteResponse, ReporteItem } from '../models/reporte.dto';
import { CuentaService } from './cuenta.service';
import { MovimientoService } from './movimiento.service';
import { ClienteService } from './cliente.service';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {

    constructor(
        private http: HttpClient,
        private cuentaService: CuentaService,
        private movimientoService: MovimientoService,
        private clienteService: ClienteService
    ) { }

    getReporte(fechaInicio: string, fechaFin: string, clienteId: string): Observable<ReporteResponse> {
        // Logic translated from Java to TypeScript using RxJS and in-memory services

        return forkJoin({
            cuentas: this.cuentaService.getAll(),
            movimientos: this.movimientoService.getAll(),
            clientes: this.clienteService.getAll()
        }).pipe(
            map(({ cuentas, movimientos, clientes }) => {
                // 1. Get Client Name (matches logic: var nombreCliente = clienteService.obtenerNombreClientePorId(clienteId))
                // Note: clienteId parameter is string, but in service logic it seemed mixed. 
                // In ClienteService data, clienteId is string "1", "2".
                const cliente = clientes.find(c => c.clienteId === clienteId || c.id === clienteId || c.id === Number(clienteId));
                const nombreCliente = cliente ? cliente.nombres : 'Desconocido';

                // 2. Get Cuentas by ClienteID
                // Parsing clienteId to number as DTO uses number or string logic depending on implementation.
                // Previous logic used Number(clienteId). Let's stick with compatible check.
                const targetClienteId = Number(clienteId);
                const cuentasCliente = cuentas.filter(c => c.clienteId === targetClienteId || String(c.clienteId) === clienteId);

                const reporte: ReporteItem[] = [];

                // 3. Iterate and build ReporteItem
                cuentasCliente.forEach(cuenta => {
                    // Dates setup
                    const start = new Date(fechaInicio);
                    start.setHours(0, 0, 0, 0);

                    const end = new Date(fechaFin);
                    end.setHours(23, 59, 59, 999);

                    /*
                    // Java logic:
                    var movimientos = movimientoService.getMovimientosByCuentaId(
                        cuenta.getId(), fechaInicioDateTime, fechaFinDateTime);
                    */

                    const movimientosCuenta = movimientos.filter(m => {
                        if (m.cuentaId !== cuenta.id) return false;

                        const movDate = new Date(m.fecha!);
                        return movDate >= start && movDate <= end;
                    });

                    // Construct DTOs
                    // Mapping Cuenta to CuentaReporte
                    // Java: var cuentaDTO = cuentaMapper.toReporteDTO(cuenta, nombreCliente);
                    const cuentaReporte = {
                        id: cuenta.id!,
                        tipoCuenta: cuenta.tipoCuenta,
                        numeroCuenta: cuenta.numeroCuenta,
                        saldoDisponible: cuenta.saldoDisponible || 0,
                        estado: String(cuenta.estado),
                        cliente: nombreCliente // Added field from mapped name
                    };

                    // Mapping Movimiento to MovimientoReporte
                    const movimientosReporte = movimientosCuenta.map(m => ({
                        id: m.id!,
                        fecha: m.fecha!,
                        tipoMovimiento: m.tipoMovimiento,
                        valor: m.valor,
                        saldoInicial: m.saldoInicial || 0,
                        saldo: m.saldo || 0,
                        cuentaId: m.cuentaId
                    }));

                    // Add to list only if logic requires, or just add all accounts found
                    // Java logic adds 'estadoCuentaDTO' regardless, but sets movements if not empty.
                    const reporteItem: ReporteItem = {
                        cuenta: cuentaReporte,
                        movimientos: movimientosReporte
                    };

                    reporte.push(reporteItem);
                });

                return reporte;
            })
        );
    }
}

