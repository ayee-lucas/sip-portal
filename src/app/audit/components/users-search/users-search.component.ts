import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterUserService } from '../../services/filter-user.service';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';

export type AuditForm = {
  identifier: string | null;
  start: Date | null;
  end: Date | null;
  entity: string | null;
  email: string | null;
  operation: string | null;
  id: string | null;
};

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {
  @Input() defaultParams!: Params;

  searchForm: FormGroup;

  constructor(
    private filterService: FilterUserService,
    private queryService: AuditQueryService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      identifier: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      start: [null],
      end: [null],
      entity: [null, Validators.required],
      email: [null, Validators.email],
      operation: [null],
      id: [null, [Validators.pattern(/^[A-Za-z0-9]*$/)]]
    });
  }

  ngOnInit() {
    this.patchForm();
  }

  changeFilter(form: FormGroup) {
    if (form.valid) {
      const filterValue = form.value.identifier;

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
      end: new Date(this.defaultParams['params'].end),
      identifier: this.defaultParams['params'].id
    });
  }
}
