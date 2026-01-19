export interface Movimiento {
  id?: number;
  fecha?: string; // ISO Date String
  tipoMovimiento: string; // "DEPOSITO", "RETIRO"
  valor: number;
  saldoInicial?: number;
  saldo?: number;
  cuentaId: number;
}
