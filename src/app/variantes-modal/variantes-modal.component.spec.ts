import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantesModalComponent } from './variantes-modal.component';

describe('VariantesModalComponent', () => {
  let component: VariantesModalComponent;
  let fixture: ComponentFixture<VariantesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
