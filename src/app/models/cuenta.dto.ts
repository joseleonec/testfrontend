export interface Cuenta {
  id?: number;
  tipoCuenta: string; // "Ahorros", "Corriente"
  numeroCuenta: string;
  saldoInicial: number;
  saldoDisponible?: number;
  estado: string | boolean; // Supports "True" string or boolean true/false
  clienteId: number;
}
