
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  usuariosRegistrados: any[] = [];

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  mensaje: string = '';
  registroCorrecto: boolean = false;

  registrar() {

    if (
      this.nombre.trim() === '' ||
      this.correo.trim() === '' ||
      this.contrasena === '' ||
      this.confirmarContrasena === ''
    ) {

      this.mensaje = 'Por favor, completa todos los campos.';
      this.registroCorrecto = false;

    } else if (!this.correo.includes('@') || !this.correo.includes('.')) {

      this.mensaje = 'Ingresa un correo electrónico válido.';
      this.registroCorrecto = false;

    } else if (this.contrasena.length < 8) {

      this.mensaje = 'La contraseña debe tener mínimo 8 caracteres.';
      this.registroCorrecto = false;

    } else if (this.contrasena !== this.confirmarContrasena) {

      this.mensaje = 'Las contraseñas no coinciden.';
      this.registroCorrecto = false;

    } else {

      this.usuariosRegistrados.push({
        nombre: this.nombre,
        correo: this.correo,
        contrasena: this.contrasena,
        rol: 'usuario'
      });

      this.mensaje = '¡Registro completado correctamente!';
      this.registroCorrecto = true;

      console.log(this.usuariosRegistrados);

    }

  }

}
