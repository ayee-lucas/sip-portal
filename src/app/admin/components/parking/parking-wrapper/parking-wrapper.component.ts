import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ParkingSelectorService } from 'src/app/admin/services/parking/parking-selector.service';
import { Parking } from 'src/app/admin/types/response-type-parking';
import { QueryService } from 'src/app/query/services/query.service';
import { MatDialog } from '@angular/material/dialog';
import { ParkingDeleteDialogComponent } from '../parking-delete-dialog/parking-delete-dialog.component';
import { ParkingDeleteService } from '../../../services/parking/parking-delete.service';
import { ActionSelectorService } from '../../../services/parking/action-selector.service';

@Component({
  selector: 'app-parking-wrapper',
  templateUrl: './parking-wrapper.component.html'
})
export class ParkingWrapperComponent implements OnInit, OnDestroy {
  selectedParking$!: Observable<Parking | null>;
  params: Params;

  action$!: Observable<'update' | 'rates'>;

  constructor(
    private parkingSelectorService: ParkingSelectorService,
    private queryService: QueryService,
    private parkingDeleteService: ParkingDeleteService,
    private actionService: ActionSelectorService,
    public dialog: MatDialog
  ) {
    this.params = this.queryService.getParams();
  }

  ngOnInit(): void {
    this.action$ = this.actionService.getAction();

    this.selectedParking$ = this.parkingSelectorService.getParking();

    const selectParam = this.params['params'].selected;

    if (selectParam && selectParam > 0) {
      this.parkingSelectorService.setSelectedParking(selectParam);
      return;
    }

    this.queryService.updateParams({ new: true });
  }

  ngOnDestroy(): void {
    this.parkingSelectorService.clearParking();
  }

  toggleAddProfile() {
    const params = this.queryService.getParams();

    this.queryService.setParams({
      page: params['params'].page,
      size: params['params'].size,
      sort: params['params'].sort,
      new: true
    });

    this.parkingSelectorService.clearParking();
  }

  toggleRates() {
    this.actionService.setAction('rates');
  }

  toggleUpdate() {
    this.actionService.setAction('update');
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ParkingDeleteDialogComponent, {
      width: '500px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = this.queryService.getParams();

      if (result && params['params'].selected) {
        this.parkingDeleteService.deleteParking(params['params'].selected);
      }
    });
  }
}
