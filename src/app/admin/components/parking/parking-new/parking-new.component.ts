import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ParkingForm } from 'src/app/admin/types/parking-type';
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
    private queryService: QueryService
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
}
