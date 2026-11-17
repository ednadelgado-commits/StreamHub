
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {

  titulo = 'Perfil';

  mostrarinfo = false;
  editar = false;

  nombre: string = 'Carlos Mendoza';
  correo: string = 'carlos.mendoza@email.com';

  nuevoNombre: string = '';
  nuevoCorreo: string = '';

  mensaje: string = '';

  editarPerfil() {

    this.nuevoNombre = this.nombre;
    this.nuevoCorreo = this.correo;

    this.editar = true;
    this.mensaje = '';

  }

  guardarCambios() {

    if (this.nuevoNombre.trim() === '' || this.nuevoCorreo.trim() === '') {

      this.mensaje = 'Completa todos los campos.';

    } else {

      this.nombre = this.nuevoNombre;
      this.correo = this.nuevoCorreo;

      this.editar = false;
      this.mensaje = 'Perfil actualizado correctamente.';

    }

  }

  cancelarEdicion() {

    this.editar = false;
    this.mensaje = '';

  }
    servicios = [
    {
      nombre: 'Crunchyroll Mega Fan',
      estado: 'Buscando cupo'
    },
    {
      nombre: 'Apple One Familiar',
      estado: 'Buscando cupo'
    }
  ];

  nuevoServicio: string = '';

  agregarServicio() {

    if (this.nuevoServicio.trim() === '') {

      return;

    }

    this.servicios.push({
      nombre: this.nuevoServicio,
      estado: 'Buscando cupo'
    });

    this.nuevoServicio = '';

  }

  eliminarServicio(indice: number) {

    this.servicios.splice(indice, 1);

  }
  mostrarFormularioServicio: boolean = false;
  notificacionCobros: boolean = true;
  notificacionSolicitudes: boolean = true;
  reporteMensual: boolean = false;
}
