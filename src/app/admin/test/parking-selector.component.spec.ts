import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingSelectorComponent } from '../components/parking/parking-selector/parking-selector.component';

describe('ParkingSelectorComponent', () => {
  let component: ParkingSelectorComponent;
  let fixture: ComponentFixture<ParkingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingSelectorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
