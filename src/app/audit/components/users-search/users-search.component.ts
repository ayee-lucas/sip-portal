import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterUserService } from '../../services/filter-user.service';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { AuditForm } from '../types/audit-form.types';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {
  @Input() defaultParams!: Params;

  searchForm = new FormGroup<AuditForm>({
    id: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    entity: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.email]),
    operation: new FormControl<string | null>(null),
    sub: new FormControl<string | null>(null, [
      Validators.pattern(/^[A-Za-z0-9]*$/) // Must contain only letters and numbers
    ])
  });

  constructor(
    private filterService: FilterUserService,
    private queryService: AuditQueryService
  ) {}

  ngOnInit() {
    this.patchForm();
  }

  changeFilter(form: FormGroup<AuditForm>) {
    if (form.valid) {
      const filterValue = form.value.id;

      this.queryService.updateParams(form.value);

      if (filterValue) {
        this.filterService.applyFilter(filterValue);
      }
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
