import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ParkingNewService } from 'src/app/admin/services/parking/parking-new.service';
import { ParkingForm } from 'src/app/admin/types/parking-type';
import { Parking } from 'src/app/admin/types/response-type-parking';
import { QueryService } from 'src/app/query/services/query.service';

@Component({
  selector: 'app-parking-new',
  templateUrl: './parking-new.component.html'
})
export class ParkingNewComponent implements OnInit {
  newParkingForm!: FormGroup<ParkingForm>;

  selectOptions = [
    { value: true, label: 'userSelector.active' },
    { value: false, label: 'userSelector.inactive' }
  ];

  private params: Params;

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private messageService: MessageService,
    private parkingNewService: ParkingNewService
  ) {
    this.params = this.queryService.getParams();
  }

  ngOnInit(): void {
    this.newParkingForm = this.fb.group({
      code: [Number(this.params['params'].code) ?? 0, Validators.min(0)],
      name: [this.params['params'].name ?? '', Validators.required],
      address: [this.params['params'].address ?? '', Validators.required],
      manager: [this.params['params'].manager ?? '', Validators.required],
      phone: [Number(this.params['params'].phone) ?? 0, Validators.min(0)],
      status: [false, Validators.required]
    });
  }

  onSubmit() {
    const { name, address, code, manager, phone, status } =
      this.newParkingForm.value;

    if (
      !name ||
      !address ||
      !code ||
      !manager ||
      !phone ||
      status === null ||
      status === undefined
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all the required fields'
      });

      return;
    }

    const data: Parking = {
      parkingId: 0,
      code,
      name: name.trim(),
      address: address.trim(),
      manager: manager.trim(),
      phone,
      status
    };

    this.parkingNewService.addParking(data);
  }
}
