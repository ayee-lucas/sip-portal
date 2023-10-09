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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableUsersComponent implements AfterViewInit, OnInit {
  @Input() mockUsers: User[] = [];

  @Input() defaultParams!: Params;

  columns = ['identifier', 'date', 'entity', 'user', 'operation', 'id']; // Cambio de 'id' a 'identifier'
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) paginatorSort!: MatSort;

  constructor(
    private filterService: FilterUserService,
    private TranslateService: TranslateService
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.mockUsers);
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
}
