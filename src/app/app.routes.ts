import { Routes } from '@angular/router';
import { Perfil } from './components/perfil/perfil';

export const routes: Routes = [
    { path: '', component: Perfil },
    { path: '**', redirectTo: '' }

];
