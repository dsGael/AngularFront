import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Foto {
  id: number;
  url: string;
  titulo: string;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private fotos$ = new BehaviorSubject<Foto[]>([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      titulo: 'Montañas',
      likes: 5
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      titulo: 'Naturaleza',
      likes: 8
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      titulo: 'Paisaje',
      likes: 3
    }
  ]);

  private contadorTotalLikes$ = new BehaviorSubject<number>(16);

  constructor() {
    this.actualizarContadorTotal();
  }

  getFotos(): Observable<Foto[]> {
    return this.fotos$.asObservable();
  }

  getContadorTotal(): Observable<number> {
    return this.contadorTotalLikes$.asObservable();
  }

  agregarFoto(url: string, titulo: string): void {
    const fotos = this.fotos$.value;
    const nuevoId = Math.max(...fotos.map(f => f.id), 0) + 1;
    const nuevaFoto: Foto = {
      id: nuevoId,
      url,
      titulo,
      likes: 0
    };
    this.fotos$.next([...fotos, nuevaFoto]);
    this.actualizarContadorTotal();
  }

  darLike(id: number): void {
    const fotos = this.fotos$.value.map(foto =>
      foto.id === id ? { ...foto, likes: foto.likes + 1 } : foto
    );
    this.fotos$.next(fotos);
    this.actualizarContadorTotal();
  }

  eliminarFoto(id: number): void {
    const fotos = this.fotos$.value.filter(foto => foto.id !== id);
    this.fotos$.next(fotos);
    this.actualizarContadorTotal();
  }

  private actualizarContadorTotal(): void {
    const total = this.fotos$.value.reduce((sum, foto) => sum + foto.likes, 0);
    this.contadorTotalLikes$.next(total);
  }
}
