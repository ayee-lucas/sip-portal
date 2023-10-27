import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-parking-delete-dialog',
  templateUrl: './parking-delete-dialog.component.html'
})
export class ParkingDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<ParkingDeleteDialogComponent>) {}
}
