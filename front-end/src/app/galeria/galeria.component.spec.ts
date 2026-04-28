import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaComponent } from './galeria.component';
import { GaleriaService } from '../services/galeria.service';

describe('GaleriaComponent', () => {
  let component: GaleriaComponent;
  let fixture: ComponentFixture<GaleriaComponent>;
  let galeriaService: GaleriaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriaComponent);
    component = fixture.componentInstance;
    galeriaService = TestBed.inject(GaleriaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load fotos on init', (done) => {
    galeriaService.getFotos().subscribe(fotos => {
      expect(fotos.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should toggle formulario visibility', () => {
    expect(component.mostrarFormulario).toBeFalse();
    component.toggleFormulario();
    expect(component.mostrarFormulario).toBeTrue();
    component.toggleFormulario();
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('should validate form correctly', () => {
    component.urlFoto = '';
    component.tituloFoto = '';
    component.validarFormulario();
    expect(component.formularioValido).toBeFalse();

    component.urlFoto = 'https://ejemplo.com/foto.jpg';
    component.tituloFoto = 'Mi foto';
    component.validarFormulario();
    expect(component.formularioValido).toBeTrue();
  });

  it('should add a new photo', () => {
    spyOn(galeriaService, 'agregarFoto');
    component.urlFoto = 'https://ejemplo.com/foto.jpg';
    component.tituloFoto = 'Nueva foto';
    component.validarFormulario();
    component.agregarFoto();
    expect(galeriaService.agregarFoto).toHaveBeenCalledWith(component.urlFoto, component.tituloFoto);
  });

  it('should give a like to a photo', () => {
    spyOn(galeriaService, 'darLike');
    component.darLike(1);
    expect(galeriaService.darLike).toHaveBeenCalledWith(1);
  });

  it('should delete a photo', () => {
    spyOn(galeriaService, 'eliminarFoto');
    spyOn(window, 'confirm').and.returnValue(true);
    component.eliminarFoto(1);
    expect(galeriaService.eliminarFoto).toHaveBeenCalledWith(1);
  });

  it('should update contador total', (done) => {
    galeriaService.getContadorTotal().subscribe(total => {
      expect(total).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});
