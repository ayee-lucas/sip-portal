import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchUserDialogComponent } from '../search-user-dialog/search-user-dialog.component';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-users-selector',
  templateUrl: './search-users-selector.component.html',
  styleUrls: ['./search-users-selector.component.scss']
})
export class SearchUsersSelectorComponent implements OnInit {
  searchForm!: FormGroup;

  params: Params;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private queryService: AuditQueryService,
    private translate: TranslateService
  ) {
    this.params = this.queryService.getParams();
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]] // Add a required validator
    });

    if (this.params['params'].id) {
      this.openDialog();
    }
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.queryService.updateParams({
        ...this.params['params'],
        id: this.searchForm.value.search
      });

      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchUserDialogComponent, {
      data: {
        search: this.searchForm.value.search
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.queryService.deleteParam('id');
    });
  }
}
