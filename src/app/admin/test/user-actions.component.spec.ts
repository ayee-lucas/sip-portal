import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateComponent } from '../components/users/user-update/user-update.component';

describe('UserActionsComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
