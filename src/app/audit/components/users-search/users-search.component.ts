import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { FilterUserService } from '../../services/filter-user.service';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { FormControl } from '@angular/forms';

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

  searchForm: FormGroup;

  constructor(
    private filterService: FilterUserService,
    private queryService: AuditQueryService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      identifier: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      start: new FormControl('', [dateNotInFutureValidator]),
      end: new FormControl('', [dateNotInFutureValidator]),
      entity: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      operation: new FormControl(''),
      id: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]*$/)])
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
