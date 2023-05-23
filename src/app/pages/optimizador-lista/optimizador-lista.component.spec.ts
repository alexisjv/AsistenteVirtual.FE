import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizadorListaComponent } from './optimizador-lista.component';

describe('OptimizadorComponent', () => {
  let component: OptimizadorListaComponent;
  let fixture: ComponentFixture<OptimizadorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimizadorListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizadorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
