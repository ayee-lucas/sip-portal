import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { UserSelectorSearchService } from '../../services/user-selector-search.service';
import { map, Observable } from 'rxjs';
import { ResponseUserError, User } from '../../types/response-type-users';
import { _isUser } from '../../../shared/utils/TypeGuards';
import { SelectedUserService } from '../../services/selected-user.service';

type SearchUserDialogComponentData = {
  search: string;
};

@Component({
  selector: 'app-search-user-dialog',
  templateUrl: './search-user-dialog.component.html',
  styleUrls: ['./search-user-dialog.component.scss']
})
export class SearchUserDialogComponent implements OnInit {
  user$!: Observable<User | ResponseUserError>;
  /** @internal */ isUser = _isUser;

  constructor(
    public dialogRef: MatDialogRef<SearchUserDialogComponent>,
    private queryService: AuditQueryService,
    private userSearchService: UserSelectorSearchService,
    private selectedUserService: SelectedUserService,
    @Inject(MAT_DIALOG_DATA) public data: SearchUserDialogComponentData
  ) {}

  ngOnInit() {
    this.requestUser();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectUser(user: User) {
    this.selectedUserService.setUserSelected(user);
    this.dialogRef.close();
  }

  private requestUser() {
    const idParam = this.queryService.getParams()['params'].id;

    this.user$ = this.userSearchService.getUser().pipe(
      map(data => {
        return data as User | ResponseUserError;
      })
    );

    this.userSearchService.init(idParam);
  }
}
