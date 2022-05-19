import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsArtistasComponent } from './products-artistas.component';

describe('ProductsArtistasComponent', () => {
  let component: ProductsArtistasComponent;
  let fixture: ComponentFixture<ProductsArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsArtistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
