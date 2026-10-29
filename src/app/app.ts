import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { solicitudes } from './components/solicitudes/solicitudes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, solicitudes],
  templateUrl: './app.html',
})
export class App {}