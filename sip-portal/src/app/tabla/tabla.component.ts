import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent {
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    []
  );
  @Input() displayedColumns: string[] = [];
}
