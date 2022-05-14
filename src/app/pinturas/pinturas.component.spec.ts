import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinturasComponent } from './pinturas.component';

describe('PinturasComponent', () => {
  let component: PinturasComponent;
  let fixture: ComponentFixture<PinturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
