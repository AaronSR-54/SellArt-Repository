import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCompletadoComponent } from './pedido-completado.component';

describe('PedidoCompletadoComponent', () => {
  let component: PedidoCompletadoComponent;
  let fixture: ComponentFixture<PedidoCompletadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoCompletadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
