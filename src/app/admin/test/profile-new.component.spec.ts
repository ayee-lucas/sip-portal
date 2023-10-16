import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewComponent } from '../components/profiles/profile-new/profile-new.component';

describe('ProfileNewComponent', () => {
  let component: ProfileNewComponent;
  let fixture: ComponentFixture<ProfileNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileNewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
