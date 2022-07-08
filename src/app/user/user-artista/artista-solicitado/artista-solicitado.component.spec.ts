import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaSolicitadoComponent } from './artista-solicitado.component';

describe('ArtistaSolicitadoComponent', () => {
  let component: ArtistaSolicitadoComponent;
  let fixture: ComponentFixture<ArtistaSolicitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistaSolicitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaSolicitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
