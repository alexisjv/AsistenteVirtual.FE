import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizarListaComponent } from './personalizar-lista.component';

describe('PersonalizarListaComponent', () => {
  let component: PersonalizarListaComponent;
  let fixture: ComponentFixture<PersonalizarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizarListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
