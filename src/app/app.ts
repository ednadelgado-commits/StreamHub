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