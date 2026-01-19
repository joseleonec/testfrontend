import { Routes } from '@angular/router';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { MovimientoCreateComponent } from './components/movimientos/movimiento-create/movimiento-create.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { CuentaCreateComponent } from './components/cuentas/cuenta-create/cuenta-create.component';
import { ReporteViewComponent } from './components/reportes/reporte-view/reporte-view.component';

export const routes: Routes = [
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/create', component: ClienteCreateComponent },
  { path: 'cuentas/create', component: CuentaCreateComponent },
  { path: 'movimientos/create', component: MovimientoCreateComponent },
  { path: 'reportes', component: ReporteViewComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];
