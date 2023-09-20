import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {} from 'module';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
})
export class QueryComponent implements OnInit {
  filtroForm: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'fechaInicio',
    'fechaFin',
    'operacion',
    'entidad',
    'usuario',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  originalData: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filtroForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      operacion: [''],
      entidad: [''],
      usuario: [''],
    });

    this.originalData = [
      {
        fechaInicio: '2023-09-01',
        fechaFin: '2023-09-05',
        operacion: 'Operación 1',
        entidad: 'Entidad 1',
        usuario: 'Usuario 1',
      },
      {
        fechaInicio: '2023-09-02',
        fechaFin: '2023-09-06',
        operacion: 'Operación 2',
        entidad: 'Entidad 2',
        usuario: 'Usuario 2',
      },
      {
        fechaInicio: '2023-09-03',
        fechaFin: '2023-09-07',
        operacion: 'Operación 3',
        entidad: 'Entidad 3',
        usuario: 'Usuario 3',
      },
      {
        fechaInicio: '2023-09-04',
        fechaFin: '2023-09-08',
        operacion: 'Operación 4',
        entidad: 'Entidad 4',
        usuario: 'Usuario 4',
      },
      {
        fechaInicio: '2023-09-05',
        fechaFin: '2023-09-09',
        operacion: 'Operación 5',
        entidad: 'Entidad 5',
        usuario: 'Usuario 5',
      },
      {
        fechaInicio: '2023-09-06',
        fechaFin: '2023-09-10',
        operacion: 'Operación 6',
        entidad: 'Entidad 6',
        usuario: 'Usuario 6',
      },
      {
        fechaInicio: '2023-09-07',
        fechaFin: '2023-09-11',
        operacion: 'Operación 7',
        entidad: 'Entidad 7',
        usuario: 'Usuario 7',
      },
      {
        fechaInicio: '2023-09-08',
        fechaFin: '2023-09-12',
        operacion: 'Operación 8',
        entidad: 'Entidad 8',
        usuario: 'Usuario 8',
      },
      {
        fechaInicio: '2023-09-09',
        fechaFin: '2023-09-13',
        operacion: 'Operación 9',
        entidad: 'Entidad 9',
        usuario: 'Usuario 9',
      },
      {
        fechaInicio: '2023-09-10',
        fechaFin: '2023-09-14',
        operacion: 'Operación 10',
        entidad: 'Entidad 10',
        usuario: 'Usuario 10',
      },
    ];

    this.route.queryParams.subscribe((queryParams) => {
      if (Object.keys(queryParams).length > 0) {
        this.aplicarFiltrosDesdeURL(queryParams);
      }
    });

    this.aplicarFiltros();
  }

  ngOnInit(): void {}

  limpiarFiltros() {
    this.filtroForm.reset();

    this.dataSource = new MatTableDataSource<any>(this.originalData);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  buscar() {
    const parametrosBusqueda = this.filtroForm.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: parametrosBusqueda,
      queryParamsHandling: 'merge',
    });
  }

  aplicarFiltros() {
    const parametrosBusqueda = this.filtroForm.value;
    const resultadosFiltrados = this.originalData.filter((item: any) => {
      const fechaInicio = new Date(item.fechaInicio);
      const fechaFin = new Date(item.fechaFin);

      return (
        (parametrosBusqueda.fechaInicio === '' ||
          isNaN(fechaInicio.getTime()) ||
          fechaInicio >= new Date(parametrosBusqueda.fechaInicio)) &&
        (parametrosBusqueda.fechaFin === '' ||
          isNaN(fechaFin.getTime()) ||
          fechaFin <= new Date(parametrosBusqueda.fechaFin)) &&
        (parametrosBusqueda.operacion === '' ||
          item.operacion.includes(parametrosBusqueda.operacion)) &&
        (parametrosBusqueda.entidad === '' ||
          item.entidad.includes(parametrosBusqueda.entidad)) &&
        (parametrosBusqueda.usuario === '' ||
          item.usuario.includes(parametrosBusqueda.usuario))
      );
    });

    this.dataSource = new MatTableDataSource<any>(resultadosFiltrados);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  aplicarFiltrosDesdeURL(queryParams: { [key: string]: any }) {
    const valoresPredeterminados = {
      fechaInicio: '',
      fechaFin: '',
      operacion: '',
      entidad: '',
      usuario: '',
    };

    const valoresFormulario = { ...valoresPredeterminados, ...queryParams };
    this.filtroForm.setValue(valoresFormulario);
    this.aplicarFiltros();
  }
}
