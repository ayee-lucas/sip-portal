import { Component, Input } from '@angular/core';
import { ParkingSelectorService } from 'src/app/admin/services/parking/parking-selector.service';
import { Parking } from 'src/app/admin/types/response-type-parking';
import { ActionSelectorService } from '../../../services/parking/action-selector.service';

@Component({
  selector: 'app-parking-selector',
  templateUrl: './parking-selector.component.html'
})
export class ParkingSelectorComponent {
  @Input() parkings!: Parking[] | null;

  constructor(
    private parkingSelector: ParkingSelectorService,
    private actionService: ActionSelectorService
  ) {}

  setParking(id: number) {
    this.actionService.setAction('update');
    this.parkingSelector.setSelectedParking(id);
  }
}
