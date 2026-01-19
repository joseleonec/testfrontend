export interface ClienteRequest {
  clienteId: string;
  contrasena: string;
  direccion: string;
  edad: number;
  estado: string; 
  genero: string;
  identificacion: string;
  nombre: string;
  telefono: string;
}

export interface ClienteResponse {
  id: number;
  clienteId: string;
  direccion: string;
  edad: number;
  estado: string;
  genero: string;
  identificacion: string;
  nombre: string;
  telefono: string;
}
