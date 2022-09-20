import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMedicamentComponent } from './detail-medicament.component';

describe('DetailMedicamentComponent', () => {
  let component: DetailMedicamentComponent;
  let fixture: ComponentFixture<DetailMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMedicamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
