import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPaginatorComponent } from '../components/parking/parking-paginator/parking-paginator.component';

describe('ParkingPaginatorComponent', () => {
  let component: ParkingPaginatorComponent;
  let fixture: ComponentFixture<ParkingPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingPaginatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
