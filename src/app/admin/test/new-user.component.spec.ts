import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewComponent } from '../components/users/user-new/user-new.component';

describe('NewUserComponent', () => {
  let component: UserNewComponent;
  let fixture: ComponentFixture<UserNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
