import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArtistaComponent } from './user-artista.component';

describe('UserArtistaComponent', () => {
  let component: UserArtistaComponent;
  let fixture: ComponentFixture<UserArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserArtistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
