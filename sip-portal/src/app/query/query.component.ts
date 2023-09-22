import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {} from 'module';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
})
export class QueryComponent implements OnInit {
  filterForm: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'startDate',
    'endDate',
    'operation',
    'entity',
    'user',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  originalData: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      operation: [''],
      entity: [''],
      user: [''],
    });

    this.originalData = [
      {
        startDate: '2023-09-01',
        endDate: '2023-09-05',
        operation: 'Operation 1',
        entity: 'Entity 1',
        user: 'User 1',
      },
      {
        startDate: '2023-09-02',
        endDate: '2023-09-06',
        operation: 'Operation 2',
        entity: 'Entity 2',
        user: 'User 2',
      },
      {
        startDate: '2023-09-03',
        endDate: '2023-09-07',
        operation: 'Operation 3',
        entity: 'Entity 3',
        user: 'User 3',
      },
      {
        startDate: '2023-09-04',
        endDate: '2023-09-08',
        operation: 'Operation 4',
        entity: 'Entity 4',
        user: 'User 4',
      },
      {
        startDate: '2023-09-05',
        endDate: '2023-09-09',
        operation: 'Operation 5',
        entity: 'Entity 5',
        user: 'User 5',
      },
      {
        startDate: '2023-09-06',
        endDate: '2023-09-10',
        operation: 'Operation 6',
        entity: 'Entity 6',
        user: 'User 6',
      },
      {
        startDate: '2023-09-07',
        endDate: '2023-09-11',
        operation: 'Operation 7',
        entity: 'Entity 7',
        user: 'User 7',
      },
      {
        startDate: '2023-09-08',
        endDate: '2023-09-12',
        operation: 'Operation 8',
        entity: 'Entity 8',
        user: 'User 8',
      },
      {
        startDate: '2023-09-09',
        endDate: '2023-09-13',
        operation: 'Operation 9',
        entity: 'Entity 9',
        user: 'User 9',
      },
      {
        startDate: '2023-09-10',
        endDate: '2023-09-14',
        operation: 'Operation 10',
        entity: 'Entity 10',
        user: 'User 10',
      },
    ];

    this.route.queryParams.subscribe((queryParams) => {
      if (Object.keys(queryParams).length > 0) {
        this.applyFiltersFromURL(queryParams);
      }
    });

    this.applyFilters();
  }

  ngOnInit(): void {}

  clearFilters() {
    this.filterForm.reset();

    this.dataSource = new MatTableDataSource<any>(this.originalData);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  search() {
    const searchParams = this.filterForm.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: searchParams,
      queryParamsHandling: 'merge',
    });
  }

  applyFilters() {
    const searchParams = this.filterForm.value;
    const filteredResults = this.originalData.filter((item: any) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

      return (
        (searchParams.startDate === '' ||
          isNaN(startDate.getTime()) ||
          startDate >= new Date(searchParams.startDate)) &&
        (searchParams.endDate === '' ||
          isNaN(endDate.getTime()) ||
          endDate <= new Date(searchParams.endDate)) &&
        (searchParams.operation === '' ||
          item.operation.includes(searchParams.operation)) &&
        (searchParams.entity === '' ||
          item.entity.includes(searchParams.entity)) &&
        (searchParams.user === '' ||
          item.user.includes(searchParams.user))
      );
    });

    this.dataSource = new MatTableDataSource<any>(filteredResults);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFiltersFromURL(queryParams: { [key: string]: any }) {
    const defaultValues = {
      startDate: '',
      endDate: '',
      operation: '',
      entity: '',
      user: '',
    };

    const formValues = { ...defaultValues, ...queryParams };
    this.filterForm.setValue(formValues);
    this.applyFilters();
  }
}
