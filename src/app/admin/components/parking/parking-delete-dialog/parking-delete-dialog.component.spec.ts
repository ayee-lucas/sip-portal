import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDeleteDialogComponent } from './parking-delete-dialog.component';

describe('ParkingDeleteDialogComponent', () => {
  let component: ParkingDeleteDialogComponent;
  let fixture: ComponentFixture<ParkingDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingDeleteDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
