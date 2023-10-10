import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FilterUserService } from '../../services/filter-user.service';
import { QueryService } from '../../services/query.service';
import { Params } from '@angular/router';
import { AuditForm } from '../../types/audit-form.types';
import { dateNotInFutureValidator } from '../../../validators/date-validators';
import { TranslateService } from '@ngx-translate/core';

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
    private queryService: QueryService,
    private fb: FormBuilder,
    private TranslateService: TranslateService
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }

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

  private buildForm() {
    this.searchForm = this.fb.group({
      identifier: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      start: new FormControl(new Date(), [dateNotInFutureValidator]),
      end: new FormControl(new Date(), [dateNotInFutureValidator]),
      entity: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      operation: new FormControl(''),
      id: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]*$/)])
    });
  }
}
