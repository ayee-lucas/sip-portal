import { Component, Input } from '@angular/core';
import { Parking } from 'src/app/admin/types/response-type-parking';

@Component({
  selector: 'app-parking-selector',
  templateUrl: './parking-selector.component.html'
})
export class ParkingSelectorComponent {
  @Input() parkings!: Parking[] | null;
}
