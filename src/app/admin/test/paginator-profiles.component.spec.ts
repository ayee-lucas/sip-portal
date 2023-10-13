import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorProfilesComponent } from '../components/profiles/paginator-profiles/paginator-profiles.component';

describe('PaginatorProfilesComponent', () => {
  let component: PaginatorProfilesComponent;
  let fixture: ComponentFixture<PaginatorProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorProfilesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
