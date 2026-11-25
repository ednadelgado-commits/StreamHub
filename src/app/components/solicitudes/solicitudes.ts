import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

type AccionModal = 'enviar' | 'aceptar' | 'rechazar' | 'expulsar';

interface Grupo {
  id: number;
  nombre: string;
  capacidad: number;
}

interface Solicitud {
  id: number;
  nombre: string;
  grupoId: number;
  mensaje: string;
}

interface NuevaSolicitud {
  nombre: string;
  grupoId: number;
  mensaje: string;
}

interface Participante {
  id: number;
  grupoId: number;
  nombre: string;
  esTitular: boolean;
}

@Component({
  selector: 'app-solicitudes',
  imports: [FormsModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css',
})
export class Solicitudes {
  // Datos temporales de demostración.
  grupos: Grupo[] = [
    { id: 1, nombre: 'Prime Video', capacidad: 3 },
    { id: 2, nombre: 'Disney+ 4K', capacidad: 4 },
  ];

  solicitudesPendientes: Solicitud[] = [
    { id: 1, nombre: 'Juan Pablo Morales', grupoId: 1, mensaje: 'Hola Carlos, tengo la transferencia lista para cada inicio de mes.' },
    { id: 2, nombre: 'Sofía Herrera', grupoId: 2, mensaje: 'Busco plaza a largo plazo para mi televisor.' },
  ];

  participantes: Participante[] = [
    { id: 1, grupoId: 1, nombre: 'Carlos Mendoza', esTitular: true },
    { id: 2, grupoId: 1, nombre: 'Luis Rivas', esTitular: false },
    { id: 3, grupoId: 2, nombre: 'Carlos Mendoza', esTitular: true },
    { id: 4, grupoId: 2, nombre: 'Ana Hernández', esTitular: false },
    { id: 5, grupoId: 2, nombre: 'Raúl Pérez', esTitular: false },
  ];

  // Campos del formulario.
  nombreSolicitante = '';
  grupoParaSolicitudId = 1;
  mensajeSolicitud = '';

  // Búsqueda y grupo seleccionado.
  grupoSeleccionadoId = 1;
  busquedaSolicitudes = '';
  filtroGrupoSolicitud = 'todos';

  // Modal y mensajes.
  modalAbierto = false;
  accionModal: AccionModal | null = null;
  solicitudSeleccionada: Solicitud | null = null;
  participanteSeleccionado: Participante | null = null;
  solicitudPorEnviar: NuevaSolicitud | null = null;
  aviso = '';
  tipoAviso: 'exito' | 'error' = 'exito';

  // Contadores para no repetir identificadores.
  ultimoIdSolicitud = 0;
  ultimoIdParticipante = 0;

  constructor() {
    for (const solicitud of this.solicitudesPendientes) {
      if (solicitud.id > this.ultimoIdSolicitud) {
        this.ultimoIdSolicitud = solicitud.id;
      }
    }
    for (const participante of this.participantes) {
      if (participante.id > this.ultimoIdParticipante) {
        this.ultimoIdParticipante = participante.id;
      }
    }
  }

  // Buscar el grupo seleccionado.
  get grupoSeleccionado(): Grupo | undefined {
    for (const grupo of this.grupos) {
      if (grupo.id === this.grupoSeleccionadoId) {
        return grupo;
      }
    }
    return undefined;
  }

  // Buscar solicitudes por texto y grupo.
  get solicitudesFiltradas(): Solicitud[] {
    const resultado: Solicitud[] = [];
    const texto = this.busquedaSolicitudes.toLowerCase().trim();

    for (const solicitud of this.solicitudesPendientes) {
      const nombre = solicitud.nombre.toLowerCase();
      const grupo = this.nombreGrupo(solicitud.grupoId).toLowerCase();
      const mensaje = solicitud.mensaje.toLowerCase();

      const coincideTexto = nombre.includes(texto) || grupo.includes(texto) || mensaje.includes(texto);
      const coincideGrupo = this.filtroGrupoSolicitud === 'todos' ||
        solicitud.grupoId === Number(this.filtroGrupoSolicitud);

      if (coincideTexto && coincideGrupo) {
        resultado.push(solicitud);
      }
    }
    return resultado;
  }

  // Mostrar integrantes del grupo seleccionado.
  get participantesFiltrados(): Participante[] {
    const resultado: Participante[] = [];
    for (const participante of this.participantes) {
      if (participante.grupoId === this.grupoSeleccionadoId) {
        resultado.push(participante);
      }
    }
    return resultado;
  }

  get totalParticipantesGrupo(): number {
    return this.ocupados(this.grupoSeleccionadoId);
  }

  get plazasDisponibles(): number {
    return this.plazasDeGrupo(this.grupoSeleccionadoId);
  }

  nombreGrupo(grupoId: number): string {
    for (const grupo of this.grupos) {
      if (grupo.id === grupoId) {
        return grupo.nombre;
      }
    }
    return 'Grupo no disponible';
  }

  ocupados(grupoId: number): number {
    let total = 0;
    for (const participante of this.participantes) {
      if (participante.grupoId === grupoId) {
        total++;
      }
    }
    return total;
  }

  plazasDeGrupo(grupoId: number): number {
    for (const grupo of this.grupos) {
      if (grupo.id === grupoId) {
        const libres = grupo.capacidad - this.ocupados(grupoId);
        if (libres > 0) {
          return libres;
        }
        return 0;
      }
    }
    return 0;
  }

  obtenerIniciales(nombre: string): string {
    const palabras = nombre.trim().split(' ');
    let iniciales = palabras[0].charAt(0);
    if (palabras.length > 1) {
      iniciales = iniciales + palabras[1].charAt(0);
    }
    return iniciales.toUpperCase();
  }

  cambiarGrupo(grupoId: string): void {
    this.grupoSeleccionadoId = Number(grupoId);
  }

  // Comprobar campos, cupo y usuarios repetidos.
  // Devuelve un mensaje si hay error, o '' si está correcto.
  validarSolicitud(nombre: string, grupoId: number, mensaje: string): string {
    if (nombre.trim() === '' || mensaje.trim() === '') {
      return 'Completa el nombre y el mensaje.';
    }

    let existeGrupo = false;
    for (const grupo of this.grupos) {
      if (grupo.id === grupoId) {
        existeGrupo = true;
      }
    }
    if (!existeGrupo) {
      return 'El grupo seleccionado no existe.';
    }
    if (this.plazasDeGrupo(grupoId) === 0) {
      return 'Este grupo no tiene plazas disponibles.';
    }

    const nombreComparar = nombre.trim().toLowerCase();
    for (const solicitud of this.solicitudesPendientes) {
      if (solicitud.grupoId === grupoId && solicitud.nombre.trim().toLowerCase() === nombreComparar) {
        return 'Ya existe una solicitud pendiente de este usuario.';
      }
    }
    for (const participante of this.participantes) {
      if (participante.grupoId === grupoId && participante.nombre.trim().toLowerCase() === nombreComparar) {
        return 'Este usuario ya pertenece al grupo.';
      }
    }
    return '';
  }

  // Preparar los datos y abrir el modal de envío.
  prepararEnvio(): void {
    const nombre = this.nombreSolicitante.trim();
    const mensaje = this.mensajeSolicitud.trim();
    const grupoId = Number(this.grupoParaSolicitudId);
    const error = this.validarSolicitud(nombre, grupoId, mensaje);

    if (error !== '') {
      this.mostrarAviso(error, 'error');
      return;
    }

    this.solicitudPorEnviar = { nombre: nombre, grupoId: grupoId, mensaje: mensaje };
    this.solicitudSeleccionada = null;
    this.participanteSeleccionado = null;
    this.accionModal = 'enviar';
    this.modalAbierto = true;
  }

  abrirSolicitud(accion: 'aceptar' | 'rechazar', id: number): void {
    for (const solicitud of this.solicitudesPendientes) {
      if (solicitud.id === id) {
        this.solicitudSeleccionada = solicitud;
        this.participanteSeleccionado = null;
        this.solicitudPorEnviar = null;
        this.accionModal = accion;
        this.modalAbierto = true;
        return;
      }
    }
  }

  abrirParticipante(accion: 'expulsar', id: number): void {
    for (const participante of this.participantes) {
      if (participante.id === id && !participante.esTitular) {
        this.participanteSeleccionado = participante;
        this.solicitudSeleccionada = null;
        this.solicitudPorEnviar = null;
        this.accionModal = accion;
        this.modalAbierto = true;
        return;
      }
    }
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.accionModal = null;
    this.solicitudSeleccionada = null;
    this.participanteSeleccionado = null;
    this.solicitudPorEnviar = null;
  }

  // El modal también se cierra al presionar Escape.
  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    if (this.modalAbierto) {
      this.cerrarModal();
    }
  }

  // El botón de confirmación realiza la acción elegida.
  confirmarAccion(): void {
    if (this.accionModal === 'enviar' && this.solicitudPorEnviar) {
      const nueva = this.solicitudPorEnviar;
      const error = this.validarSolicitud(nueva.nombre, nueva.grupoId, nueva.mensaje);
      if (error !== '') {
        this.mostrarAviso(error, 'error');
        this.cerrarModal();
        return;
      }

      this.ultimoIdSolicitud++;
      this.solicitudesPendientes.push({
        id: this.ultimoIdSolicitud,
        nombre: nueva.nombre,
        grupoId: nueva.grupoId,
        mensaje: nueva.mensaje,
      });
      this.nombreSolicitante = '';
      this.mensajeSolicitud = '';
      this.busquedaSolicitudes = '';
      this.filtroGrupoSolicitud = 'todos';
      this.mostrarAviso('Solicitud de ' + nueva.nombre + ' enviada correctamente.');

    } else if (this.accionModal === 'aceptar' && this.solicitudSeleccionada) {
      const solicitud = this.solicitudSeleccionada;
      if (this.plazasDeGrupo(solicitud.grupoId) === 0) {
        this.mostrarAviso('No hay plazas disponibles.', 'error');
        this.cerrarModal();
        return;
      }
      // Evitar aceptar dos veces a la misma persona.
      for (const participante of this.participantes) {
        if (participante.grupoId === solicitud.grupoId &&
            participante.nombre.trim().toLowerCase() === solicitud.nombre.trim().toLowerCase()) {
          this.mostrarAviso('Este usuario ya pertenece al grupo.', 'error');
          this.cerrarModal();
          return;
        }
      }
      this.ultimoIdParticipante++;
      this.participantes.push({
        id: this.ultimoIdParticipante,
        grupoId: solicitud.grupoId,
        nombre: solicitud.nombre,
        esTitular: false,
      });
      this.quitarSolicitud(solicitud.id);
      this.grupoSeleccionadoId = solicitud.grupoId;
      this.mostrarAviso(solicitud.nombre + ' fue aceptado en ' + this.nombreGrupo(solicitud.grupoId) + '.');

    } else if (this.accionModal === 'rechazar' && this.solicitudSeleccionada) {
      const solicitud = this.solicitudSeleccionada;
      this.quitarSolicitud(solicitud.id);
      this.mostrarAviso('Solicitud de ' + solicitud.nombre + ' rechazada.');

    } else if (this.accionModal === 'expulsar' && this.participanteSeleccionado) {
      const participante = this.participanteSeleccionado;
      if (!participante.esTitular) {
        const restantes: Participante[] = [];
        for (const persona of this.participantes) {
          if (persona.id !== participante.id) {
            restantes.push(persona);
          }
        }
        this.participantes = restantes;
        this.mostrarAviso(participante.nombre + ' fue retirado del grupo.');
      }
    }
    this.cerrarModal();
  }

  cerrarAviso(): void {
    this.aviso = '';
  }

  quitarSolicitud(id: number): void {
    const restantes: Solicitud[] = [];
    for (const solicitud of this.solicitudesPendientes) {
      if (solicitud.id !== id) {
        restantes.push(solicitud);
      }
    }
    this.solicitudesPendientes = restantes;
  }

  mostrarAviso(mensaje: string, tipo: 'exito' | 'error' = 'exito'): void {
    this.aviso = mensaje;
    this.tipoAviso = tipo;
  }
}
