import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GaleriaService, Foto } from '../services/galeria.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  fotos: Foto[] = [];
  contadorTotal: number = 0;
  
  // Formulario
  urlFoto: string = '';
  tituloFoto: string = '';
  mostrarFormulario: boolean = false;
  formularioValido: boolean = false;

  constructor(private readonly galeriaService: GaleriaService) {}

  ngOnInit(): void {
    this.galeriaService.getFotos().subscribe(fotos => {
      this.fotos = fotos;
    });

    this.galeriaService.getContadorTotal().subscribe(total => {
      this.contadorTotal = total;
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  validarFormulario(): void {
    this.formularioValido = this.urlFoto.trim() !== '' && this.tituloFoto.trim() !== '';
  }

  agregarFoto(): void {
    this.validarFormulario();
    if (this.formularioValido) {
      this.galeriaService.agregarFoto(this.urlFoto, this.tituloFoto);
      this.limpiarFormulario();
      this.mostrarFormulario = false;
    }
  }

  darLike(id: number): void {
    this.galeriaService.darLike(id);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = 'https://i.pinimg.com/736x/12/72/19/127219107b3fa1c4fb0ee204c344749c.jpg';
    }
  }

  eliminarFoto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta foto?')) {
      this.galeriaService.eliminarFoto(id);
    }
  }

  limpiarFormulario(): void {
    this.urlFoto = '';
    this.tituloFoto = '';
    this.formularioValido = false;
  }

  get fotosDisponibles(): boolean {
    return this.fotos.length > 0;
  }
}
