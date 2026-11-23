
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

type EstadoPago = 'Titular' | 'Al día' | 'Pendiente';
type AccionModal = 'aceptar' | 'rechazar' | 'expulsar' | 'detalleSolicitud' | 'detalleParticipante' | 'enviar';

interface Grupo {
  id: number;
  nombre: string;
  capacidad: number;
  cuota: number;
}

interface SolicitudPendiente {
  id: number;
  nombre: string;
  grupoId: number;
  mensaje: string;
  avatarUrl: string;
}

interface NuevaSolicitud {
  nombre: string;
  grupoId: number;
  mensaje: string;
}

interface Participante {
  id: number;
  grupoId: number;
  iniciales: string;
  nombre: string;
  fechaIngreso: string;
  cuota: number;
  estatus: EstadoPago;
  esTitular: boolean;
}

@Component({
  selector: 'app-solicitudes',
  imports: [FormsModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css',
})
export class Solicitudes {

  // Datos de demostración. Más adelante se pueden conectar al servicio del módulo 2.
  grupos: Grupo[] = [
    { id: 1, nombre: 'Prime Video', capacidad: 3, cuota: 50 },
    { id: 2, nombre: 'Disney+ 4K', capacidad: 4, cuota: 65 },
  ];

  solicitudesPendientes: SolicitudPendiente[] = [
    {
      id: 1,
      nombre: 'Juan Pablo Morales',
      grupoId: 1,
      mensaje: 'Hola Carlos, tengo la transferencia lista para cada inicio de mes.',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      nombre: 'Sofía Herrera',
      grupoId: 2,
      mensaje: 'Busco plaza a largo plazo para mi televisor.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
  ];

  participantes: Participante[] = [
    { id: 1, grupoId: 1, iniciales: 'CM', nombre: 'Carlos Mendoza', fechaIngreso: '15/Ene/2026', cuota: 50, estatus: 'Titular', esTitular: true },
    { id: 2, grupoId: 1, iniciales: 'LR', nombre: 'Luis Rivas', fechaIngreso: '02/Feb/2026', cuota: 50, estatus: 'Al día', esTitular: false },
    { id: 3, grupoId: 2, iniciales: 'CM', nombre: 'Carlos Mendoza', fechaIngreso: '15/Ene/2026', cuota: 65, estatus: 'Titular', esTitular: true },
    { id: 4, grupoId: 2, iniciales: 'AH', nombre: 'Ana Hernández', fechaIngreso: '08/Mar/2026', cuota: 65, estatus: 'Al día', esTitular: false },
    { id: 5, grupoId: 2, iniciales: 'RP', nombre: 'Raúl Pérez', fechaIngreso: '12/Mar/2026', cuota: 65, estatus: 'Pendiente', esTitular: false },
  ];

  // STREAM-4: Envío de solicitudes
  nombreSolicitante = '';
  grupoParaSolicitudId = 1;
  mensajeSolicitud = '';

  solicitudPorEnviar: NuevaSolicitud | null = null;

  // Filtros y selección de grupos
  grupoSeleccionadoId = 1;
  busquedaSolicitudes = '';
  filtroGrupoSolicitud = 'todos';
  busquedaParticipantes = '';
  filtroPago = 'todos';

  // Control de modales y avisos
  modalAbierto = false;
  accionModal: AccionModal | null = null;
  solicitudSeleccionada: SolicitudPendiente | null = null;
  participanteSeleccionado: Participante | null = null;
  aviso = '';
  tipoAviso: 'exito' | 'error' = 'exito';

  // Obtener el grupo seleccionado
  get grupoSeleccionado(): Grupo | undefined {
    return this.grupos.find((grupo) => grupo.id === this.grupoSeleccionadoId);
  }

  // Buscar y filtrar solicitudes pendientes
  get solicitudesFiltradas(): SolicitudPendiente[] {
    const texto = this.normalizar(this.busquedaSolicitudes);

    return this.solicitudesPendientes.filter((solicitud) => {
      const coincideGrupo = this.filtroGrupoSolicitud === 'todos' ||
        solicitud.grupoId === Number(this.filtroGrupoSolicitud);

      const contenido = this.normalizar(
        `${solicitud.nombre} ${this.nombreGrupo(solicitud.grupoId)} ${solicitud.mensaje}`
      );

      return coincideGrupo && contenido.includes(texto);
    });
  }

  // Buscar y filtrar participantes activos
  get participantesFiltrados(): Participante[] {
    const texto = this.normalizar(this.busquedaParticipantes);

    return this.participantes.filter((participante) => {
      const coincideGrupo = participante.grupoId === this.grupoSeleccionadoId;
      const coincideNombre = this.normalizar(participante.nombre).includes(texto);
      const coincidePago = this.filtroPago === 'todos' ||
        participante.estatus === this.filtroPago;

      return coincideGrupo && coincideNombre && coincidePago;
    });
  }

  // Total de participantes del grupo seleccionado
  get totalParticipantesGrupo(): number {
    return this.participantes.filter(
      (participante) => participante.grupoId === this.grupoSeleccionadoId
    ).length;
  }

  // Plazas disponibles del grupo seleccionado
  get plazasDisponibles(): number {
    return Math.max(
      0,
      (this.grupoSeleccionado?.capacidad ?? 0) - this.totalParticipantesGrupo
    );
  }

  // Obtener nombre de la plataforma
  nombreGrupo(grupoId: number): string {
    return this.grupos.find(
      (grupo) => grupo.id === grupoId
    )?.nombre ?? 'Grupo no disponible';
  }

  // Contar participantes de un grupo
  ocupados(grupoId: number): number {
    return this.participantes.filter(
      (participante) => participante.grupoId === grupoId
    ).length;
  }

  // Mostrar cantidades en pesos mexicanos
  moneda(cantidad: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(cantidad);
  }

  // Cambiar el grupo de la tabla
  cambiarGrupo(grupoId: string): void {
    this.grupoSeleccionadoId = Number(grupoId);
    this.busquedaParticipantes = '';
    this.filtroPago = 'todos';
  }

  // ==================================================
  // STREAM-4: DESARROLLAR EL ENVÍO DE SOLICITUDES
  // ==================================================

  // Validar los datos antes de enviar una solicitud
  prepararEnvio(): void {

    const nombre = this.nombreSolicitante.trim();
    const mensaje = this.mensajeSolicitud.trim();
    const grupoId = Number(this.grupoParaSolicitudId);

    // Verificar que los campos no estén vacíos
    if (!nombre || !mensaje) {
      this.mostrarAviso(
        'Completa todos los campos para enviar la solicitud.',
        'error'
      );
      return;
    }

    // Verificar que el grupo exista
    const grupo = this.grupos.find(
      (item) => item.id === grupoId
    );

    if (!grupo) {
      this.mostrarAviso(
        'El grupo seleccionado no existe.',
        'error'
      );
      return;
    }

    // Verificar las plazas disponibles
    if (this.ocupados(grupo.id) >= grupo.capacidad) {
      this.mostrarAviso(
        'No puedes enviar la solicitud porque el grupo está lleno.',
        'error'
      );
      return;
    }

    // Evitar solicitudes pendientes duplicadas
    const solicitudExiste = this.solicitudesPendientes.some(
      (solicitud) =>
        solicitud.grupoId === grupoId &&
        this.normalizar(solicitud.nombre) === this.normalizar(nombre)
    );

    if (solicitudExiste) {
      this.mostrarAviso(
        'Este usuario ya tiene una solicitud pendiente para el grupo.',
        'error'
      );
      return;
    }

    // Verificar que el usuario no pertenezca al grupo
    const yaEsParticipante = this.participantes.some(
      (participante) =>
        participante.grupoId === grupoId &&
        this.normalizar(participante.nombre) === this.normalizar(nombre)
    );

    if (yaEsParticipante) {
      this.mostrarAviso(
        'Este usuario ya pertenece al grupo seleccionado.',
        'error'
      );
      return;
    }

    // Guardar los datos temporalmente
    this.solicitudPorEnviar = {
      nombre: nombre,
      grupoId: grupoId,
      mensaje: mensaje
    };

    // Abrir el modal para confirmar el envío
    this.solicitudSeleccionada = null;
    this.participanteSeleccionado = null;
    this.accionModal = 'enviar';
    this.modalAbierto = true;
  }

  // Generar identificador para una nueva solicitud
  private siguienteIdSolicitud(): number {
    return Math.max(
      0,
      ...this.solicitudesPendientes.map((solicitud) => solicitud.id)
    ) + 1;
  }

  // ==================================================
  // MODALES DE SOLICITUDES Y PARTICIPANTES
  // ==================================================

  // Abrir modal para aceptar, rechazar o ver solicitudes
  abrirSolicitud(accion: 'aceptar' | 'rechazar' | 'detalleSolicitud', id: number): void {
    const solicitud = this.solicitudesPendientes.find(
      (item) => item.id === id
    );

    if (!solicitud) return;

    this.solicitudSeleccionada = solicitud;
    this.participanteSeleccionado = null;
    this.accionModal = accion;
    this.modalAbierto = true;
  }

  // Abrir modal para expulsar o consultar participantes
  abrirParticipante(accion: 'expulsar' | 'detalleParticipante', id: number): void {
    const participante = this.participantes.find(
      (item) => item.id === id
    );

    if (!participante) return;

    // El administrador no puede expulsarse
    if (accion === 'expulsar' && participante.esTitular) return;

    this.participanteSeleccionado = participante;
    this.solicitudSeleccionada = null;
    this.accionModal = accion;
    this.modalAbierto = true;
  }

  // Cerrar modal y limpiar selecciones
  cerrarModal(): void {
    this.modalAbierto = false;
    this.accionModal = null;
    this.solicitudSeleccionada = null;
    this.participanteSeleccionado = null;

    // Limpiar datos temporales del envío
    this.solicitudPorEnviar = null;
  }

  // Cerrar modal al presionar Escape
  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    if (this.modalAbierto) this.cerrarModal();
  }

  // ==================================================
  // CONFIRMAR ACCIONES
  // ==================================================

  confirmarAccion(): void {

    // STREAM-4: Confirmar el envío de una solicitud
    if (this.accionModal === 'enviar' && this.solicitudPorEnviar) {

      const nueva = this.solicitudPorEnviar;

      const grupo = this.grupos.find(
        (item) => item.id === nueva.grupoId
      );

      // Comprobar nuevamente que la solicitud sea válida
      const solicitudExiste = this.solicitudesPendientes.some(
        (solicitud) =>
          solicitud.grupoId === nueva.grupoId &&
          this.normalizar(solicitud.nombre) === this.normalizar(nueva.nombre)
      );

      const yaEsParticipante = this.participantes.some(
        (participante) =>
          participante.grupoId === nueva.grupoId &&
          this.normalizar(participante.nombre) === this.normalizar(nueva.nombre)
      );

      if (
        !grupo ||
        this.ocupados(nueva.grupoId) >= grupo.capacidad ||
        solicitudExiste ||
        yaEsParticipante
      ) {
        this.mostrarAviso(
          'No se puede registrar la solicitud. Verifica las plazas y los datos.',
          'error'
        );
        this.cerrarModal();
        return;
      }

      // Agregar la solicitud al arreglo de pendientes
      this.solicitudesPendientes.push({
        id: this.siguienteIdSolicitud(),
        nombre: nueva.nombre,
        grupoId: nueva.grupoId,
        mensaje: nueva.mensaje,
        avatarUrl: ''
      });

      // Limpiar los campos del formulario
      this.nombreSolicitante = '';
      this.mensajeSolicitud = '';

      // Actualizar búsqueda para mostrar todas las solicitudes
      this.busquedaSolicitudes = '';
      this.filtroGrupoSolicitud = 'todos';

      // Mostrar mensaje de éxito
      this.mostrarAviso(
        `Solicitud de ${nueva.nombre} enviada correctamente a ${grupo.nombre}.`
      );

      this.cerrarModal();
      return;
    }

    // STREAM-5: Aceptar solicitudes
    if (this.accionModal === 'aceptar' && this.solicitudSeleccionada) {

      const solicitud = this.solicitudSeleccionada;
      const grupo = this.grupos.find(
        (item) => item.id === solicitud.grupoId
      );

      if (!grupo || this.ocupados(grupo.id) >= grupo.capacidad) {
        this.mostrarAviso(
          'No se puede aceptar: el grupo ya no tiene plazas disponibles.',
          'error'
        );
        this.cerrarModal();
        return;
      }

      // Incorporar participante al grupo
      this.participantes.push({
        id: this.siguienteId(),
        grupoId: grupo.id,
        iniciales: this.obtenerIniciales(solicitud.nombre),
        nombre: solicitud.nombre,
        fechaIngreso: new Intl.DateTimeFormat('es-MX', {
          dateStyle: 'medium'
        }).format(new Date()),
        cuota: grupo.cuota,
        estatus: 'Pendiente',
        esTitular: false,
      });

      // Quitar solicitud de las pendientes
      this.quitarSolicitud(solicitud.id);

      // Mostrar el grupo al que ingresó
      this.grupoSeleccionadoId = grupo.id;
      this.busquedaParticipantes = '';
      this.filtroPago = 'todos';

      this.mostrarAviso(
        `${solicitud.nombre} fue agregado a ${grupo.nombre}. Su pago queda pendiente.`
      );

    } else if (this.accionModal === 'rechazar' && this.solicitudSeleccionada) {

      // STREAM-5: Rechazar solicitudes
      const solicitud = this.solicitudSeleccionada;

      this.quitarSolicitud(solicitud.id);

      this.mostrarAviso(
        `Solicitud de ${solicitud.nombre} rechazada.`
      );

    } else if (this.accionModal === 'expulsar' && this.participanteSeleccionado) {

      // STREAM-6: Expulsar participantes
      const participante = this.participanteSeleccionado;

      // El administrador nunca puede expulsarse
      if (!participante.esTitular) {

        this.participantes = this.participantes.filter(
          (item) => item.id !== participante.id
        );

        this.mostrarAviso(
          `${participante.nombre} fue retirado del grupo.`
        );
      }
    }

    this.cerrarModal();
  }

  // ==================================================
  // MÉTODOS AUXILIARES
  // ==================================================

  // Cerrar las notificaciones
  cerrarAviso(): void {
    this.aviso = '';
  }

  // Quitar una solicitud de las pendientes
  private quitarSolicitud(id: number): void {
    this.solicitudesPendientes = this.solicitudesPendientes.filter(
      (solicitud) => solicitud.id !== id
    );
  }

  // Obtener las iniciales de un participante
  private obtenerIniciales(nombre: string): string {
    return nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join('')
      .toUpperCase();
  }

  // Generar ID para los participantes
  private siguienteId(): number {
    return Math.max(
      0,
      ...this.participantes.map((item) => item.id)
    ) + 1;
  }

  // Normalizar textos para las búsquedas
  private normalizar(texto: string): string {
    return texto
      .toLocaleLowerCase('es-MX')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // Mostrar mensajes de éxito o error
  private mostrarAviso(
    mensaje: string,
    tipo: 'exito' | 'error' = 'exito'
  ): void {
    this.aviso = mensaje;
    this.tipoAviso = tipo;
  }
}
