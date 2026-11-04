import { Component, signal } from '@angular/core';
import { Finanzas} from '../app/Components/finanzas/finanzas';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [Finanzas, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('StreamHub');
}
