import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWrapperComponent } from '../components/users/user-wrapper/user-wrapper.component';

describe('UserOperationsComponent', () => {
  let component: UserWrapperComponent;
  let fixture: ComponentFixture<UserWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserWrapperComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
