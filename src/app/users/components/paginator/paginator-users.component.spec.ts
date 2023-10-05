import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorUsersComponent } from './paginator-users.component';

describe('PaginatorComponent', () => {
  let component: PaginatorUsersComponent;
  let fixture: ComponentFixture<PaginatorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorUsersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
