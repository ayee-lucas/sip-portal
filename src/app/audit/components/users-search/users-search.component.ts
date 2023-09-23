import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterUserService } from '../../services/filter-user.service';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';

type FormUser = {
  id: FormControl<string | null>;
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
  entity: FormControl<string | null>;
  email: FormControl<string | null>;
  operation: FormControl<string | null>;
  sub: FormControl<string | null>;
};

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {
  @Input() defaultParams!: Params;

  searchForm = new FormGroup({
    id: new FormControl<string | null>(null),
    start: new FormControl(),
    end: new FormControl(),
    entity: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    operation: new FormControl<string | null>(null),
    sub: new FormControl<string | null>(null)
  });

  constructor(
    private filterService: FilterUserService,
    private queryService: AuditQueryService
  ) {}

  ngOnInit() {
    this.patchForm();
  }

  changeFilter(form: FormGroup<FormUser>) {
    const filterValue = form.value.id;

    this.queryService.updateParams(form.value);

    if (filterValue) {
      this.filterService.applyFilter(filterValue);
    }
  }

  clearFilter() {
    this.searchForm.reset();
    this.queryService.clearParams();
  }

  patchForm() {
    this.searchForm.patchValue({
      ...this.defaultParams['params'],
      start: new Date(this.defaultParams['params'].start),
      end: new Date(this.defaultParams['params'].end)
    });
  }
}
