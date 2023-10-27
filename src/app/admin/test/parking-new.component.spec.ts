import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingNewComponent } from '../components/parking/parking-new/parking-new.component';

describe('ParkingNewComponent', () => {
  let component: ParkingNewComponent;
  let fixture: ComponentFixture<ParkingNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingNewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
