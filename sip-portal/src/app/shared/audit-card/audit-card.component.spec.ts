import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCardComponent } from './audit-card.component';

describe('AuditCardComponent', () => {
  let component: AuditCardComponent;
  let fixture: ComponentFixture<AuditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
