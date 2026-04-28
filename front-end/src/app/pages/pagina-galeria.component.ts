import { Component } from '@angular/core';
import { GaleriaComponent } from '../galeria/galeria.component';

@Component({
  selector: 'app-pagina-galeria',
  standalone: true,
  imports: [GaleriaComponent],
  templateUrl: './pagina-galeria.component.html',
  styleUrls: ['./pagina-galeria.component.css']
})
export class PaginaGaleriaComponent {}
