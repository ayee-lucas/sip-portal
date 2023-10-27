import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingActionsComponent } from '../components/parking/parking-actions/parking-actions.component';

describe('ParkingActionsComponent', () => {
  let component: ParkingActionsComponent;
  let fixture: ComponentFixture<ParkingActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
