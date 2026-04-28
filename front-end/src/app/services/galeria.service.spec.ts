import { TestBed } from '@angular/core/testing';
import { GaleriaService } from './galeria.service';

describe('GaleriaService', () => {
  let service: GaleriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaleriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return fotos', (done) => {
    service.getFotos().subscribe(fotos => {
      expect(fotos.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a new foto', (done) => {
    service.getFotos().subscribe(fotosBefore => {
      const countBefore = fotosBefore.length;
      service.agregarFoto('https://ejemplo.com/foto.jpg', 'Nueva foto');
      service.getFotos().subscribe(fotosAfter => {
        expect(fotosAfter.length).toBe(countBefore + 1);
        done();
      });
    });
  });

  it('should increase likes', (done) => {
    service.getFotos().subscribe(fotos => {
      const fotoId = fotos[0].id;
      const likesBefore = fotos[0].likes;
      service.darLike(fotoId);
      service.getFotos().subscribe(fotosAfter => {
        const fotoActualizada = fotosAfter.find(f => f.id === fotoId);
        expect(fotoActualizada?.likes).toBe(likesBefore + 1);
        done();
      });
    });
  });

  it('should delete a foto', (done) => {
    service.getFotos().subscribe(fotosBefore => {
      const countBefore = fotosBefore.length;
      const fotoIdToDelete = fotosBefore[0].id;
      service.eliminarFoto(fotoIdToDelete);
      service.getFotos().subscribe(fotosAfter => {
        expect(fotosAfter.length).toBe(countBefore - 1);
        expect(fotosAfter.find(f => f.id === fotoIdToDelete)).toBeUndefined();
        done();
      });
    });
  });

  it('should update total likes counter', (done) => {
    service.getFotos().subscribe(fotos => {
      if (fotos.length > 0) {
        service.darLike(fotos[0].id);
        service.getContadorTotal().subscribe(total => {
          expect(total).toBeGreaterThan(0);
          done();
        });
      }
    });
  });
});
