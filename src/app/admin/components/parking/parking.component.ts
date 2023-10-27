import { Component, OnInit } from '@angular/core';
import { ParkingRequestService } from '../../services/parking/parking-request.service';
import { QueryService } from 'src/app/query/services/query.service';
import { setDefaultParams } from 'src/app/shared/utils/default-params';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseParking } from '../../types/response-type-parking';
import { _IsParkingSuccess } from 'src/app/shared/utils/type-guards';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html'
})
export class ParkingComponent implements OnInit {
  parkings$!: Observable<ResponseParking>;

  mobileControlsVisible = false;

  readonly params: Params;

  /** @internal */ isParkingSuccess = _IsParkingSuccess;

  constructor(
    private parkingRequestService: ParkingRequestService,
    private queryService: QueryService
  ) {
    this.params = this.queryService.getParams();

    setDefaultParams(this.params, 'parkingId');
  }

  ngOnInit() {
    this.parkings$ = this.parkingRequestService.getParkings();

    this.parkingRequestService.init(this.params['params']);
  }

  toggleMobileControls() {
    this.mobileControlsVisible = !this.mobileControlsVisible;
  }
}
