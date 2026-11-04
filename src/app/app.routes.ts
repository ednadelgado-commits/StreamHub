import { Routes } from '@angular/router';
import { Finanzas } from './Components/finanzas/finanzas';
/*import { Solicitudes } from './Components/solicitudes/solicitudes';*/

export const routes: Routes = [

  { path: 'finanzas', component: Finanzas},
  { path: '', redirectTo: 'finanzas', pathMatch: 'full'}

];
