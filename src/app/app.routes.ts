import { Routes } from '@angular/router';
import { Admin } from './components/admin/admin';
import { Finanzas } from './components/finanzas/finanzas';
import { Grupos } from './components/grupos/grupos';
import { Inicio } from './components/inicio/inicio';
import { Perfil } from './components/perfil/perfil';
import { Solicitudes } from './components/solicitudes/solicitudes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'grupos', component: Grupos },
  { path: 'solicitudes', component: Solicitudes },
  { path: 'finanzas', component: Finanzas },
  { path: 'administrador', component: Admin },
  { path: 'perfil', component: Perfil },
  { path: '**', redirectTo: '' },
];
