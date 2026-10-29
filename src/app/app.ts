<<<<<<< HEAD
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
=======
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inicio } from './Components/inicio/inicio';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Inicio],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('StreamHub');
}
>>>>>>> bca29dddbfd57b13b4ff2ecf9b086d12a386731d
