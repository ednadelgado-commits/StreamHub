import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Movimiento {
  id: number;
  servicio: string;
  grupo: string;
  concepto: string;
  tipo: 'Ingreso' | 'Gasto';
  monto: number;
  metodo: string;
  fecha: string;
  estado: 'Completado' | 'Pendiente';
}

@Component({
  selector: 'app-finanzas',
  imports: [FormsModule],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css'
})
export class Finanzas implements OnInit {
  // Variables del formulario, como en el ejemplo del docente
  mostrarFormulario = false;
  enviado = false;
  servicio = '';
  otroServicio = '';
  grupo = '';
  concepto = '';
  tipo = '';
  monto: number | null = null;
  metodo = '';
  fecha = '';
  estado = '';

  servicios = ['Netflix', 'Disney+', 'Max', 'Prime Video', 'Spotify', 'Otro'];
  movimientos: Movimiento[] = [];
  demostracion: Movimiento[] = [];
  vistaDemo = false;
  mesSeleccionado = this.fechaActual().slice(0, 7);
  filtro = 'Todos';

  ngOnInit() {
    this.cargar();
    this.crearDemostracion();
  }

  fechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  crearDemostracion() {
    // Solo sirve para enseñar el diseño; NO se guarda como pago real.
    const mes = this.mesSeleccionado;
    this.demostracion = [
      { id: -1, fecha: `${mes}-07`, servicio: 'Netflix', grupo: 'Grupo A', concepto: 'Pago de suscripción', tipo: 'Ingreso', monto: 396.80, metodo: 'Transferencia', estado: 'Completado' },
      { id: -2, fecha: `${mes}-06`, servicio: 'Disney+', grupo: 'Grupo B', concepto: 'Cuotas del grupo', tipo: 'Ingreso', monto: 248, metodo: 'Tarjeta', estado: 'Completado' },
      { id: -3, fecha: `${mes}-05`, servicio: 'Max', grupo: 'Grupo C', concepto: 'Pago mensual', tipo: 'Ingreso', monto: 223.20, metodo: 'Transferencia', estado: 'Completado' },
      { id: -4, fecha: `${mes}-04`, servicio: 'Prime Video', grupo: 'Grupo A', concepto: 'Aportaciones recibidas', tipo: 'Ingreso', monto: 186, metodo: 'Transferencia', estado: 'Completado' },
      { id: -5, fecha: `${mes}-03`, servicio: 'Spotify', grupo: 'Grupo G1', concepto: 'Renovación del grupo', tipo: 'Ingreso', monto: 186, metodo: 'Efectivo', estado: 'Completado' },
      { id: -6, fecha: `${mes}-02`, servicio: 'Netflix', grupo: 'Grupo A', concepto: 'Compra de cuenta', tipo: 'Gasto', monto: 900, metodo: 'Tarjeta', estado: 'Completado' },
      { id: -7, fecha: `${mes}-10`, servicio: 'Netflix', grupo: 'Grupo A', concepto: 'Cuota por confirmar', tipo: 'Ingreso', monto: 25, metodo: 'Transferencia', estado: 'Pendiente' },
      { id: -8, fecha: `${mes}-11`, servicio: 'Disney+', grupo: 'Grupo B', concepto: 'Próxima mensualidad', tipo: 'Ingreso', monto: 19, metodo: 'Transferencia', estado: 'Pendiente' },
      { id: -9, fecha: `${mes}-12`, servicio: 'Max', grupo: 'Grupo C', concepto: 'Cuota pendiente', tipo: 'Ingreso', monto: 17, metodo: 'Efectivo', estado: 'Pendiente' },
      { id: -10, fecha: `${mes}-13`, servicio: 'Prime Video', grupo: 'Grupo A', concepto: 'Pago por confirmar', tipo: 'Ingreso', monto: 20, metodo: 'Transferencia', estado: 'Pendiente' }
    ];
  }

  cambiarVistaDemo() {
    this.vistaDemo = !this.vistaDemo;
    this.enviado = false;
    if (this.vistaDemo) this.crearDemostracion();
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.enviado = false;
    this.limpiarFormulario();
    this.fecha = this.fechaActual();
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  limpiarFormulario() {
    this.servicio = '';
    this.otroServicio = '';
    this.grupo = '';
    this.concepto = '';
    this.tipo = '';
    this.monto = null;
    this.metodo = '';
    this.fecha = '';
    this.estado = '';
  }

  // Equivalente al enviar() del ejemplo del docente
  enviar() {
    const nombreServicio = this.servicio === 'Otro'
      ? this.otroServicio.trim() : this.servicio;

    if (!nombreServicio || !this.concepto.trim() ||
        (this.tipo !== 'Ingreso' && this.tipo !== 'Gasto') ||
        this.monto === null || !Number.isFinite(this.monto) || this.monto <= 0 ||
        !this.metodo || !this.fecha ||
        (this.estado !== 'Completado' && this.estado !== 'Pendiente')) {
      alert('Completa todos los campos obligatorios.');
      return;
    }

    const movimiento: Movimiento = {
      id: Date.now(),
      servicio: nombreServicio,
      grupo: this.grupo.trim(),
      concepto: this.concepto.trim(),
      tipo: this.tipo,
      monto: this.monto,
      metodo: this.metodo,
      fecha: this.fecha,
      estado: this.estado
    };

    this.movimientos.unshift(movimiento);
    this.guardar();
    this.vistaDemo = false; // El registro verdadero nunca se mezcla con la demo
    this.mesSeleccionado = movimiento.fecha.slice(0, 7);
    this.filtro = 'Todos';
    this.enviado = true;
    this.cerrarFormulario();
    this.limpiarFormulario();
  }

  guardar() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('streamhub_movimientos', JSON.stringify(this.movimientos));
    }
  }

  cargar() {
    if (typeof window === 'undefined') return;
    try {
      const contenido = localStorage.getItem('streamhub_movimientos');
      if (!contenido) return;
      const lista = JSON.parse(contenido);
      if (Array.isArray(lista)) {
        this.movimientos = lista
          .filter(item => item && typeof item.servicio === 'string' && Number(item.monto) > 0)
          .map(item => ({
            id: Number(item.id) || Date.now(),
            servicio: String(item.servicio),
            grupo: String(item.grupo || ''),
            concepto: String(item.concepto || 'Aportación'),
            tipo: item.tipo === 'Ingreso' ? 'Ingreso' : 'Gasto',
            monto: Number(item.monto),
            metodo: String(item.metodo || 'No indicado'),
            fecha: String(item.fecha || ''),
            estado: item.estado === 'Pendiente' ? 'Pendiente' : 'Completado'
          }));
      }
    } catch {
      this.movimientos = [];
    }
  }

  get registros() {
    return this.vistaDemo ? this.demostracion : this.movimientos;
  }

  get registrosDelMes() {
    return this.registros.filter(m => m.fecha.startsWith(this.mesSeleccionado));
  }

  get historial() {
    return this.registrosDelMes.filter(m =>
      this.filtro === 'Todos' || m.tipo === this.filtro || m.estado === this.filtro
    );
  }

  get ingresos() {
    return this.registrosDelMes
      .filter(m => m.tipo === 'Ingreso' && m.estado === 'Completado')
      .reduce((suma, m) => suma + m.monto, 0);
  }

  get gastos() {
    return this.registrosDelMes
      .filter(m => m.tipo === 'Gasto' && m.estado === 'Completado')
      .reduce((suma, m) => suma + m.monto, 0);
  }

  get ganancia() {
    return this.ingresos - this.gastos;
  }

  get pendientes() {
    return this.registrosDelMes
      .filter(m => m.estado === 'Pendiente')
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  colorServicio(servicio: string) {
    const colores: Record<string, string> = {
      'Netflix': '#FA497C',
      'Disney+': '#9B65FF',
      'Max': '#3378FF',
      'Prime Video': '#22D5ED',
      'Spotify': '#19E3A0'
    };
    return colores[servicio] || '#FF8A5B';
  }

  siglaServicio(servicio: string) {
    const siglas: Record<string, string> = {
      'Netflix': 'N', 'Disney+': 'D+', 'Max': 'M',
      'Prime Video': 'PV', 'Spotify': 'S'
    };
    return siglas[servicio] || servicio.slice(0, 2).toUpperCase();
  }

  get distribucion() {
    const grupos: { servicio: string; monto: number; color: string; porcentaje: number }[] = [];
    for (const mov of this.registrosDelMes) {
      if (mov.tipo !== 'Ingreso' || mov.estado !== 'Completado') continue;
      let existe = grupos.find(g => g.servicio === mov.servicio);
      if (!existe) {
        existe = { servicio: mov.servicio, monto: 0, color: this.colorServicio(mov.servicio), porcentaje: 0 };
        grupos.push(existe);
      }
      existe.monto += mov.monto;
    }
    for (const item of grupos) {
      item.porcentaje = this.ingresos ? (item.monto / this.ingresos) * 100 : 0;
    }
    return grupos;
  }

  get grafica() {
    if (!this.ingresos) return 'conic-gradient(#2C3856 0% 100%)';
    let inicio = 0;
    const partes: string[] = [];
    for (const item of this.distribucion) {
      const fin = inicio + item.porcentaje;
      partes.push(`${item.color} ${inicio}% ${fin}%`);
      inicio = fin;
    }
    return `conic-gradient(${partes.join(', ')})`;
  }

  get saldosPorGrupo() {
    const saldos: { grupo: string; servicio: string; monto: number; color: string; porcentaje: number }[] = [];
    for (const mov of this.registrosDelMes) {
      if (mov.tipo !== 'Ingreso' || mov.estado !== 'Completado') continue;
      const nombre = mov.grupo || 'Sin grupo';
      let encontrado = saldos.find(s => s.grupo === nombre && s.servicio === mov.servicio);
      if (!encontrado) {
        encontrado = { grupo: nombre, servicio: mov.servicio, monto: 0, color: this.colorServicio(mov.servicio), porcentaje: 0 };
        saldos.push(encontrado);
      }
      encontrado.monto += mov.monto;
    }
    const maximo = Math.max(1, ...saldos.map(s => s.monto));
    for (const saldo of saldos) saldo.porcentaje = saldo.monto / maximo * 100;
    return saldos;
  }

  dinero(numero: number) {
    return numero.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  mostrarFecha(fecha: string) {
    const partes = fecha.split('-');
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : fecha;
  }

  nombreMes() {
    const [anio, mes] = this.mesSeleccionado.split('-').map(Number);
    if (!anio || !mes) return 'Mes actual';
    return new Date(anio, mes - 1, 1).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  }

  exportarReporte() {
    if (typeof window !== 'undefined') window.print();
  }
}
