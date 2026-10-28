import { Component } from '@angular/core';
import { solicitudes } from '../app/components/solicitudes/solicitudes'
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterOutlet, solicitudes],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
