import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationComponent } from '../../operation/components/operation.component';

describe('ComponentsComponent', () => {
  let component: OperationComponent;
  let fixture: ComponentFixture<OperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});