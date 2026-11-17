import { Component } from '@angular/core';

@Component({
  imports: [], //vacio pq no se necesita nada externo
  selector: 'app-admin',  //nombre de etiqueta
  styleUrl: './admin.css', //css que usa
  templateUrl: './admin.html', //html que usa
})
//todo lo que va dentro de la clase del componente
//lo puede leer HTML con interpolacion {{}}
export class Admin {
  titulo = 'Panel de administracion';
  mostrarinfo= false;

  usuarios=248;
  totalGrupos=36;
  pendientes=9;
  volumen ='18,240';

  //4 tarjetas
  listaGrupos = [
    //arreglos de objetos, grupo con sus datos
    { nombre: 'Netflix Premium', responsable: 'Ana López', integrantes: '3 de 4', estado: 'Activo' },
    { nombre: 'Spotify Familiar', responsable: 'Luis Rivas', integrantes: '5 de 6', estado: 'Activo' },
    { nombre: 'Disney+ Premium', responsable: 'María Torres', integrantes: '2 de 4', estado: 'Por completar' },
  ];


  eliminar(nombre: string) {
  this.listaGrupos = this.listaGrupos.filter(g => g.nombre !== nombre);
  }
}
