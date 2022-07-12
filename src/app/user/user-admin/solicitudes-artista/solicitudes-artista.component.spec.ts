import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesArtistaComponent } from './solicitudes-artista.component';

describe('SolicitudesArtistaComponent', () => {
  let component: SolicitudesArtistaComponent;
  let fixture: ComponentFixture<SolicitudesArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesArtistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
