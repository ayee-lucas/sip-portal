import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingRatesComponent } from '../components/parking/parking-rates/parking-rates.component';

describe('ParkingRatesComponent', () => {
  let component: ParkingRatesComponent;
  let fixture: ComponentFixture<ParkingRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingRatesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
