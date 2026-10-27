import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Finanzas} from '../app/Components/finanzas/finanzas';
@Component({
  imports: [RouterOutlet, Finanzas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('StreamHub');
}
