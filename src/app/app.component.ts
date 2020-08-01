import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {CategoriaModels} from '../app/models/categoria.models';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiciosService} from '../app/servicios.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'menu-front';
  user : any = [];
  constructor(public rest: ServiciosService, private route:ActivatedRoute, private router: Router ) { }
  ngOnInit() {
     console.log(this.rest)
  }
  getUser(){
    this.user = [];
    
  }
}
