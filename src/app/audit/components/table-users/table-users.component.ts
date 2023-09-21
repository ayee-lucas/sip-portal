import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { muckUsers, Users } from '../../mucks/data';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableUsersComponent implements AfterViewInit {
  columns = ['id', 'date', 'entity', 'user', 'operation', 'sub'];
  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource(muckUsers.content);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
