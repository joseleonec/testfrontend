export interface CuentaReporte {
  id: number;
  tipoCuenta: string;
  numeroCuenta: string;
  saldoDisponible: number;
  estado: string;
  nombreCliente: string;
}

export interface MovimientoReporte {
  id: number;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldoInicial: number;
  saldo: number;
  cuentaId: number;
}

export interface ReporteItem {
  cuenta: CuentaReporte;
  movimientos: MovimientoReporte[];
}

export type ReporteResponse = ReporteItem[];
