import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {CategoriaModels} from '../../models/categoria.models';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiciosService} from '../../servicios.service'
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria : any = [];
  constructor(public rest: ServiciosService, ) { }
  ngOnInit() {
     this.obtener();
  }
  obtener(){
    this.rest.obtenerCategoria().subscribe((data:{cont}) => {
      this.categoria = data.cont;
      console.log(this.categoria);
    });
  }
}
