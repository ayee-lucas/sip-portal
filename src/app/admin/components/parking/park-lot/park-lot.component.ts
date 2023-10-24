import { Component } from '@angular/core';

@Component({
  selector: 'app-park-lot',
  templateUrl: './park-lot.component.html'
})
export class ParkLotComponent {
  rows = Array.from({ length: 20 }, (_, i) => i + 1);
}
