import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Parking } from '../../../types/response-type-parking';
import { ParkingForm } from '../../../types/parking-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../../../../query/services/query.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ParkingUpdateService } from '../../../services/parking/parking-update.service';
import { MessageService } from 'primeng/api';
import { ActionSelectorService } from '../../../services/parking/action-selector.service';

@Component({
  selector: 'app-parking-actions',
  templateUrl: './parking-actions.component.html'
})
export class ParkingActionsComponent implements OnInit, OnDestroy {
  @Input() selectedParking!: Parking | null;
  updateParkingForm!: FormGroup<ParkingForm>;
  params: Params;
  selectOptions = [
    { value: true, label: 'userSelector.active' },
    { value: false, label: 'userSelector.inactive' }
  ];

  action$!: Observable<'update' | 'rates'>;

  unsubscribe$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private route: ActivatedRoute,
    private updateParkingService: ParkingUpdateService,
    private messageService: MessageService,
    private actionService: ActionSelectorService
  ) {
    this.params = this.queryService.getParams();
  }

  ngOnInit() {
    this.action$ = this.actionService.getAction();

    if (this.params['params'].new) {
      this.queryService.deleteParam('new');
    }

    if (this.params['params'].rates) {
      this.queryService.deleteParam('rates');
    }

    this.buildForm();
    this.patchForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const { code, manager, phone, status, name, address } =
      this.updateParkingForm.value;

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
        severity: 'warn',
        summary: 'Hey',
        detail: 'Please fill all the required fields'
      });
      return;
    }

    const data: Parking = {
      parkingId: this.selectedParking?.parkingId ?? 0,
      code,
      name: name.trim(),
      address: address.trim(),
      manager: manager.trim(),
      phone,
      status
    };

    this.updateParkingService.init(data);
  }

  private patchForm() {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.updateParkingForm.patchValue({
          code: Number(params['code']) ?? 0,
          name: params['name'] ?? '',
          address: params['address'] ?? '',
          manager: params['manager'] ?? '',
          phone: Number(params['phone']) ?? 0,
          status: params['status'] === 'true'
        });
      });
  }

  private buildForm() {
    this.updateParkingForm = this.fb.group(
      {
        code: [
          Number(this.params['params'].code) ?? 1,
          [Validators.min(1), Validators.required]
        ],
        name: [this.params['params'].name ?? '', [Validators.required]],
        address: [this.params['params'].address ?? '', [Validators.required]],
        manager: [this.params['params'].manager ?? '', [Validators.required]],
        phone: [
          Number(this.params['params'].phone) ?? 1,
          [Validators.min(1), Validators.required]
        ],
        status: [false, [Validators.required]]
      },
      { updateOn: 'blur' }
    );
  }
}
