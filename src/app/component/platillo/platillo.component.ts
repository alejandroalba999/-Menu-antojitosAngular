import { Component, OnInit } from '@angular/core';
import {ServiciosService} from '../../servicios.service';
@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent implements OnInit {

  constructor(public rest : ServiciosService) { }
 platillo: any = [];

  ngOnInit(){
    console.log(localStorage.getItem("idCategoria"));
    this.obtenerPlatillo();
  }
obtenerPlatillo(){
  this.rest.obtenerPlatilloIdCategoria(localStorage.getItem("idCategoria")).subscribe((data:{cont:{platillo}})=>{
     console.log(data.cont.platillo);
     this.platillo = data.cont.platillo;
  })
}
}
