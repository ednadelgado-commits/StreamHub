import { Component, computed, ElementRef, HostListener, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Plataforma {
  nombre: string;
  logo: string;
  categoria: 'Streaming' | 'Música' | 'Diseño';
  precio: number;
  tipoCobro: string;
  duracion: string;
  capacidad: string;
  garantia?: string;
  destacado?: boolean;
}

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  categorias = ['Todos', 'Streaming', 'Música', 'Diseño'] as const;
  categoriaActiva = signal<string>('Todos');
  busqueda = signal<string>('');

  inputBusqueda = viewChild<ElementRef<HTMLInputElement>>('inputBusqueda');

  plataformas: Plataforma[] = [
    { nombre: 'Netflix', logo: 'logos/netflix.png', categoria: 'Streaming', precio: 80, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '5 pantallas', destacado: true },
    { nombre: 'HBO Max', logo: 'logos/hbo.png', categoria: 'Streaming', precio: 50, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '5 pantallas' },
    { nombre: 'Disney+', logo: 'logos/disney.png', categoria: 'Streaming', precio: 50, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '5 pantallas' },
    { nombre: 'Apple TV+', logo: 'logos/apple.png', categoria: 'Streaming', precio: 50, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '4 pantallas' },
    { nombre: 'Universal+', logo: 'logos/universal.png', categoria: 'Streaming', precio: 45, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '4 pantallas' },
    { nombre: 'Prime Video', logo: 'logos/prime.png', categoria: 'Streaming', precio: 40, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '5 pantallas' },
    { nombre: 'Paramount+', logo: 'logos/paramount.png', categoria: 'Streaming', precio: 35, tipoCobro: 'por perfil', duracion: '1 mes', capacidad: '6 pantallas' },
    { nombre: 'ViX Premium', logo: 'logos/vix.png', categoria: 'Streaming', precio: 110, tipoCobro: 'por perfil', duracion: 'Anual', capacidad: 'Cupo 5', garantia: '10 meses de garantía', destacado: true },
    { nombre: 'Spotify', logo: 'logos/spo.png', categoria: 'Música', precio: 130, tipoCobro: 'por perfil', duracion: '3 meses', capacidad: 'Cupo 5' },
    { nombre: 'Canva Pro', logo: 'logos/canva.png', categoria: 'Diseño', precio: 30, tipoCobro: 'por link', duracion: '1 mes', capacidad: 'Acceso por invitación' },
  ];

  seleccionada = signal<Plataforma | null>(this.plataformas[0]);

  plataformasFiltradas = computed(() => {
    const cat = this.categoriaActiva();
    const texto = this.busqueda().trim().toLowerCase();

    return this.plataformas.filter((p) => {
      const coincideCategoria = cat === 'Todos' || p.categoria === cat;
      const coincideTexto =
        !texto ||
        p.nombre.toLowerCase().includes(texto) ||
        p.categoria.toLowerCase().includes(texto);

      return coincideCategoria && coincideTexto;
    });
  });

  seleccionar(p: Plataforma) {
    this.seleccionada.set(p);
  }

  actualizarBusqueda(event: Event) {
    const input = event.target as HTMLInputElement;
    this.busqueda.set(input.value);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.inputBusqueda()?.nativeElement.focus();
    }
  }
}