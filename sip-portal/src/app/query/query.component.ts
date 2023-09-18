import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
})
export class QueryComponent implements OnInit {
  filtroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filtroForm = this.formBuilder.group({
      fechaInicio: [''],
      fechaFin: [''],
      operacion: [''],
      entidad: [''],
      usuario: [''],
    });
  }

  ngOnInit(): void {}

  buscar(): void {
    const filtro = this.filtroForm.value;
    console.log('Filtro:', filtro);
  }
}
