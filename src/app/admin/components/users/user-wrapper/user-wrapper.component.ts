import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSelectorService } from '../../../services/users/user-selector.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../../types/response-type-users';
import { QueryService } from '../../../../query/services/query.service';
import { Params } from '@angular/router';
import { UserSelectorSearchService } from '../../../services/users/user-selector-search.service';
import { _isUser } from '../../../../shared/utils/type-guards';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html'
})
export class UserWrapperComponent implements OnInit, OnDestroy {
  // User selected observable to be used in the template
  userSelected$!: Observable<User | null>;

  //  Params object to be used in the ngOnInit method
  params: Params;

  // Unsubscribe subject to be used in the ngOnDestroy method
  private unsubscribe$ = new Subject<boolean>();

  // type guard to check if the object is a User
  /**
   * @private
   * @internal
   * */
  private isUser = _isUser;

  // Injecting the services to be used in the component
  /**
   * This method is called when the component is initialized
   * it uses the queryService to get the params object from the URL
   * assigns the params object to the params property
   *
   * @param userSelectorService
   * @param userSearchService
   * @param queryService
   * @param translate
   */
  constructor(
    private userSelectorService: UserSelectorService,
    private userSearchService: UserSelectorSearchService,
    private queryService: QueryService
  ) {
    this.params = this.queryService.getParams();
  }

  // OnInit method
  /**
   * This method is called when the component is initialized
   * Checks if the selected param exists and is greater than 0, calls the requestUser method
   * to fetch the user data from the API when the component is initialized
   *
   * @returns void
   * @memberof UserWrapperComponent
   */
  ngOnInit() {
    const selectParam = this.params['params'].selected;

    if (selectParam && selectParam > 0) {
      this.requestUser();

      this.userSearchService.init(selectParam);

      return;
    }

    this.userSelected$ = this.userSelectorService.getUserSelected();
  }

  // OnDestroy method
  /**
   * This method is called when the component is destroyed
   * Handles the unsubscription from the userSelected$ observable
   * @returns void
   * @memberof ProfileWrapperComponent
   */
  ngOnDestroy() {
    this.userSelectorService.clearUserSelected();
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  // Request user method
  /**
   * This method is called when the component is initialized
   * Calls the getUser method from the userSearchService
   * to fetch the user data from the API when the component is initialized
   * @private
   * @returns void
   * @memberof UserWrapperComponent
   */
  requestUser() {
    this.userSearchService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if ('loading' in data) {
          return;
        }

        if (this.isUser(data)) {
          this.userSelectorService.setUserSelected(data);

          this.userSelected$ = this.userSelectorService.getUserSelected();
        }
      });
  }
}
