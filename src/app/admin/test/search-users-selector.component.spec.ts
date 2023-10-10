import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersSelectorComponent } from '../components/users/search-users-selector/search-users-selector.component';

describe('SearchUsersSelectorComponent', () => {
  let component: SearchUsersSelectorComponent;
  let fixture: ComponentFixture<SearchUsersSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchUsersSelectorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchUsersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
