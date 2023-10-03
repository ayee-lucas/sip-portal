import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstGlanceComponent } from '../components/first-glance/first-glance.component';

describe('FirstGlanceComponent', () => {
  let component: FirstGlanceComponent;
  let fixture: ComponentFixture<FirstGlanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstGlanceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
