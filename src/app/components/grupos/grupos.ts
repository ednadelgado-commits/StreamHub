import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos.html',
  styleUrls: ['./grupos.css']
})
export class Grupos {
  Titulo="Grupos";
  mostrar: boolean = false;
}