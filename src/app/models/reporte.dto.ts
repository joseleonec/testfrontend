import { Cuenta } from './cuenta.dto';
import { Movimiento } from './movimiento.dto';

export interface ReporteItem {
  cuenta: Cuenta;
  movimientos: Movimiento[];
}

export type ReporteResponse = ReporteItem[];
