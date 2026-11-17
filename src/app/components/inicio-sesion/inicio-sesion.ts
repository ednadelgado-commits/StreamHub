
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css'
})
export class InicioSesion {

  correo: string = '';
  contrasena: string = '';
  mensaje: string = '';

  usuarios = [
    {
      nombre: 'Carlos Mendoza',
      correo: 'usuario@streamhub.com',
      contrasena: '12345678',
      rol: 'usuario'
    },
    {
      nombre: 'Administrador',
      correo: 'admin@streamhub.com',
      contrasena: 'admin123',
      rol: 'administrador'
    }
  ];

  iniciarSesion() {

    if (this.correo === '' || this.contrasena === '') {

      this.mensaje = 'Por favor, completa todos los campos.';

    } else {

      let encontrado = false;

      for (let i = 0; i < this.usuarios.length; i++) {

        if (
          this.usuarios[i].correo === this.correo &&
          this.usuarios[i].contrasena === this.contrasena
        ) {

          encontrado = true;
          this.mensaje = '¡Bienvenido, ' + this.usuarios[i].nombre + '!';

        }

      }

      if (encontrado === false) {
        this.mensaje = 'Correo o contraseña incorrectos.';
      }

    }

  }

}
