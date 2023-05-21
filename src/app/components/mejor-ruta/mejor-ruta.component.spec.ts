import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejorRutaComponent } from './mejor-ruta.component';

describe('MejorRutaComponent', () => {
  let component: MejorRutaComponent;
  let fixture: ComponentFixture<MejorRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MejorRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejorRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
