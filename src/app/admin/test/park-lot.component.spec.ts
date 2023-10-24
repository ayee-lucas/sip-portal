import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkLotComponent } from '../components/parking/park-lot/park-lot.component';

describe('ParkLotComponent', () => {
  let component: ParkLotComponent;
  let fixture: ComponentFixture<ParkLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkLotComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
