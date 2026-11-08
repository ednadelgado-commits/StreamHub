import { Component } from '@angular/core';

interface SolicitudPendiente {
  id: number;
  nombre: string;
  servicio: string;
  mensaje: string;
  avatarUrl: string;
}

interface Participante {
  id: number;
  iniciales: string;
  nombre: string;
  fechaIngreso: string;
  cuota: string;
  estatus: string;
  esTitular: boolean;
}

@Component({
  selector: 'app-solicitudes',
  imports: [],
  styleUrl: './solicitudes.css',
  templateUrl: './solicitudes.html',
})
export class Solicitudes {
  solicitudesPendientes: SolicitudPendiente[] = [
    {
      id: 1,
      nombre: 'Juan Pablo Morales',
      servicio: 'Prime Video',
      mensaje: 'Hola Carlos, tengo la transferencia lista para cada inicio de mes.',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      nombre: 'Sofía Herrera',
      servicio: 'Disney+ 4K',
      mensaje: 'Busco plaza a largo plazo para mi televisor.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
  ];

  participantes: Participante[] = [
    {
      id: 1,
      iniciales: 'CM',
      nombre: 'Carlos Mendoza',
      fechaIngreso: '15/Ene/2026',
      cuota: '$50.00 MXN',
      estatus: 'Titular',
      esTitular: true,
    },
    {
      id: 2,
      iniciales: 'LR',
      nombre: 'Luis Rivas',
      fechaIngreso: '02/Feb/2026',
      cuota: '$50.00 MXN',
      estatus: 'Al Día',
      esTitular: false,
    },
  ];

  aceptarSolicitud(id: number): void {
    const solicitud = this.solicitudesPendientes.find((item) => item.id === id);

    if (!solicitud) {
      return;
    }

    this.participantes.push({
      id: Date.now(),
      iniciales: solicitud.nombre
        .split(' ')
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase(),
      nombre: solicitud.nombre,
      fechaIngreso: new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date()),
      cuota: '$50.00 MXN',
      estatus: 'Al Día',
      esTitular: false,
    });
    this.quitarSolicitud(id);
  }

  rechazarSolicitud(id: number): void {
    this.quitarSolicitud(id);
  }

  expulsarParticipante(id: number): void {
    this.participantes = this.participantes.filter((participante) => participante.id !== id || participante.esTitular);
  }

  private quitarSolicitud(id: number): void {
    this.solicitudesPendientes = this.solicitudesPendientes.filter((solicitud) => solicitud.id !== id);
  }
}
