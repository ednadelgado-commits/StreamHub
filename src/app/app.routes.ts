import { Routes } from '@angular/router';
import { solicitudes } from './components/solicitudes/solicitudes';

export const routes: Routes = [
    {path:"", component:solicitudes},
    {path:"**", redirectTo: '' }
];
