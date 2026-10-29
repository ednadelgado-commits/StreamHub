import { Routes } from '@angular/router';
import {Grupos} from './components/grupos/grupos';

export const routes: Routes = [
  {path: '', redirectTo: '/grupos', pathMatch: 'full'},
  {path: 'grupos', component: Grupos}
];
