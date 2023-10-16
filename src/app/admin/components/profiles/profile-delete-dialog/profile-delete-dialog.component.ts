import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-delete-dialog',
  templateUrl: './profile-delete-dialog.component.html'
})
export class ProfileDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProfileDeleteDialogComponent>) {}
}
