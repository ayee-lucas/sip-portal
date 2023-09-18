import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { queryService } from './query.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
})
export class QueryComponent implements OnInit {
  filtroForm: FormGroup;

  constructor(private fb: FormBuilder, private queryService: queryService) {
    this.filtroForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      operacion: [''],
      entidad: [''],
      usuario: [''],
    });
  }

  ngOnInit(): void {}

  buscar() {
    const parametrosBusqueda = this.filtroForm.value;
    this.queryService.buscarAuditorias(parametrosBusqueda).subscribe(
      (resultados: any) => {},
      (error: any) => {
        console.error('Error al buscar auditorías', error);
      }
    );
  }
}
