import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pago {
  servicio: string;
  monto: number;
  metodo: string;
  fecha: string;
  estado: string;
}

@Component({
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-finanzas',
  styleUrl: './finanzas.css',
  templateUrl: './finanzas.html',
})
export class Finanzas implements OnInit {

  Titulo = 'Finanzas';
  ver = false;

  mostrarFormulario = false;

  servicios = ['Disney+', 'Prime Video', 'Netflix', 'Spotify', 'Max', 'Otro'];

  pagos: Pago[] = [];

  nuevoPago = {
    servicio: '',
    monto: null as number | null,
    metodo: '',
    fecha: '',
    estado: ''
  };

  ngOnInit() {
    if (typeof window !== 'undefined') {
      try {
        let datos = localStorage.getItem('streamhub_finanzas_pagos');
        if (datos) {
          let lista = JSON.parse(datos);
          this.pagos = Array.isArray(lista) ? lista : [];
        }
      } catch {
        this.pagos = [];
      }
    }
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  guardarPago() {
    if (!this.nuevoPago.servicio ||
        this.nuevoPago.monto === null ||
        this.nuevoPago.monto <= 0 ||
        !this.nuevoPago.metodo ||
        !this.nuevoPago.fecha ||
        !this.nuevoPago.estado) {
      return;
    }

    this.pagos.push({
      servicio: this.nuevoPago.servicio,
      monto: this.nuevoPago.monto,
      metodo: this.nuevoPago.metodo,
      fecha: this.nuevoPago.fecha,
      estado: this.nuevoPago.estado
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'streamhub_finanzas_pagos',
        JSON.stringify(this.pagos)
      );
    }

    this.nuevoPago = {
      servicio: '',
      monto: null,
      metodo: '',
      fecha: '',
      estado: ''
    };

    this.cerrarFormulario();
  }

  get pagosDelMes() {
    let hoy = new Date();
    let mes = hoy.getFullYear() + '-' +
      String(hoy.getMonth() + 1).padStart(2, '0');

    return this.pagos.filter(p =>
      p.estado === 'Completado' &&
      p.fecha.startsWith(mes)
    );
  }

  get total() {
    return this.pagosDelMes.reduce(
      (suma, pago) => suma + pago.monto, 0
    );
  }

  get distribucion() {
    let resultado: { servicio: string; monto: number; color: string }[] = [];
    let colores = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b'];

    for (let pago of this.pagosDelMes) {
      let existe = resultado.find(p => p.servicio === pago.servicio);

      if (existe) {
        existe.monto += pago.monto;
      } else {
        resultado.push({
          servicio: pago.servicio,
          monto: pago.monto,
          color: colores[resultado.length % colores.length]
        });
      }
    }

    return resultado;
  }

  get colorGrafica() {
    if (this.total === 0) {
      return 'conic-gradient(#334155 0% 100%)';
    }

    let inicio = 0;
    let partes: string[] = [];

    for (let item of this.distribucion) {
      let fin = inicio + item.monto / this.total * 100;
      partes.push(`${item.color} ${inicio}% ${fin}%`);
      inicio = fin;
    }

    return 'conic-gradient(' + partes.join(', ') + ')';
  }

  get proximoPago(): Pago | null {
    let pendientes = this.pagos
      .filter(p => p.estado === 'Pendiente')
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    return pendientes.length > 0 ? pendientes[0] : null;
  }

  exportarReporte() {
    window.print();
  }

}