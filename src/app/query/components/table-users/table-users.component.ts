import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../mocks/data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FilterUserService } from '../../services/filter-user.service';
import { Params } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { QueryService } from '../../services/query.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TableUsersComponent implements AfterViewInit, OnInit {
  @Input() mockUsers: User[] = [];

  @Input() defaultParams!: Params;

  @Input() responsePage!: User | null;

  _params!: Params;

  data: User[] = [];

  options = [5, 10, 15, 20];

  columns = ['date', 'entity', 'user', 'operation'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) paginatorSort!: MatSort;

  constructor(
    private filterService: FilterUserService,
    private queryService: QueryService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.paginatorSort;

    this.filterService.filterObservable.subscribe(filter => {
      this.applyFilter(filter);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  pageHandler(e: PageEvent) {
    const params = this.queryService.getParams();
    this.queryService.updateParams({ size: e.pageSize, page: e.pageIndex });
    this.userService
      .init({
        page: e.pageIndex,
        size: e.pageSize
      })
      .subscribe({
        next: (data: any) => {
          this.mockUsers = data.content;
        },
        error: err => {
          console.log('Error: ', err);
        }
      });
  }
}
