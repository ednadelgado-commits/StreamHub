import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario {
  nombre = '';
  enviarFormulario() { 
    this.enviado=true;  // Aquí puedes realizar acciones adicionales, como enviar los datos a un servidor
}
