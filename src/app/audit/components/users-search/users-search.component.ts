import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { FilterUserService } from '../../services/filter-user.service';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { AuditForm } from '../../types/audit-form.types';

function dateNotInFutureValidator(
  control: AbstractControl
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    return { futureDate: true }; // Add an error called 'futureDate' if the date is future
  }

  return null;
}

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {
  @Input() defaultParams!: Params;

  searchForm!: FormGroup<AuditForm>;

  constructor(
    private filterService: FilterUserService,
    private queryService: AuditQueryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
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

  private patchForm() {
    this.searchForm.patchValue({
      ...this.defaultParams['params'],
      start: new Date(this.defaultParams['params'].start),
      end: new Date(this.defaultParams['params'].end),
      identifier: this.defaultParams['params'].id
    });
  }
}
