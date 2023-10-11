import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfileComponent } from '../components/profiles/search-profile/search-profile.component';

describe('SearchProfileComponent', () => {
  let component: SearchProfileComponent;
  let fixture: ComponentFixture<SearchProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
