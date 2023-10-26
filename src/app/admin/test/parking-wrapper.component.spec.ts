import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingWrapperComponent } from '../components/parking/parking-wrapper/parking-wrapper.component';

describe('ParkingWrapperComponent', () => {
  let component: ParkingWrapperComponent;
  let fixture: ComponentFixture<ParkingWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingWrapperComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
