import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

export interface Grupo {
  id: number;
  servicio: string;
  cuposLibres: number;
  titulo: string;
  adminNombre: string;
  adminRating: number;
  esAdmin?: boolean;
  plazasOcupadas: number;
  plazasTotales: number;
  cuota: number;
  moneda: string;
  detalles: { texto: string }[];
}

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos.html',
  styleUrls: ['./grupos.css']
})
export class Grupos {
  pestanaActiva: 'libres' | 'participo' = 'libres';

  grupos: Grupo[] = [
    {
      id: 1,
      servicio: 'Disney+ 4K',
      cuposLibres: 1,
      titulo: 'Disney Fans México',
      adminNombre: 'María González',
      adminRating: 4.9,
      plazasOcupadas: 3,
      plazasTotales: 4,
      cuota: 75.00,
      moneda: 'MXN',
      detalles: [
        { texto: 'Fecha de cobro: Días 5 de cada mes' },
        { texto: 'Solo perfiles con PIN personal' }
      ]
    },
    {
      id: 2,
      servicio: 'Spotify HiFi',
      cuposLibres: 2,
      titulo: 'Melómanos MX',
      adminNombre: 'Rodrigo Vega',
      adminRating: 5.0,
      plazasOcupadas: 4,
      plazasTotales: 6,
      cuota: 33.15,
      moneda: 'MXN',
      detalles: [
        { texto: 'Fecha de cobro: Días 1 de cada mes' },
        { texto: 'Requiere código postal CDMX' }
      ]
    },
    {
      id: 3,
      servicio: 'Prime Video',
      cuposLibres: 1,
      titulo: 'Series & Envíos Prime',
      adminNombre: 'Leonel H. (Tú)',
      adminRating: 5.0,
      esAdmin: true,
      plazasOcupadas: 2,
      plazasTotales: 3,
      cuota: 50.00,
      moneda: 'MXN',
      detalles: [
        { texto: 'Eres el administrador de este grupo' },
        { texto: 'Renovación activa' }
      ]
    }
  ];

  getBarArray(total: number): number[] {
    return Array(total).fill(0);
  }

  cambiarPestana(pestana: 'libres' | 'participo') {
    this.pestanaActiva = pestana;
  }
}