import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfileDialogComponent } from '../components/profiles/search-profile-dialog/search-profile-dialog.component';

describe('SearchProfileDialogComponent', () => {
  let component: SearchProfileDialogComponent;
  let fixture: ComponentFixture<SearchProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchProfileDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
