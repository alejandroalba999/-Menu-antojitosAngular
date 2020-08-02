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
  error : any = [];
  categoria : any = [];
  
  constructor(public rest: ServiciosService, ) { }
  cat: CategoriaModels = new CategoriaModels();
  
  ngOnInit() {
    this.cat.blnActivo = true;
     this.obtener(); 
     console.log(this.cat.blnActivo)
  }
  cancelar(){
    this.cat.strDescripcion = "";
    this.cat.strNombre = "";
  }
  obtener(){
    this.rest.obtenerCategoria().subscribe((data:{cont}) => {
      this.categoria = data.cont;
      console.log(this.categoria);
    });
  }
  obtenerNombre(){
    this.rest.obtenerCategoriaNombre(this.cat.strFiltroNombre).subscribe((data:{cont}) => {
      this.categoria = data.cont;
      console.log(this.categoria);
    });
  }

  registrar(){
    if(this.cat.strNombre === undefined || this.cat.strDescripcion === undefined){
      this.error = "Los datos no han sido llenados"
      document.getElementById("sinLlenar").style.display = "inline";
      setTimeout(function(){document.getElementById("sinLlenar").style.display = "none"; }, 3000);
    }else{
      this.rest.agregarCategoria(this.cat).subscribe((data:{cont})=>{
        this.obtener();
      },(err:HttpErrorResponse)=>{
        console.log(err.error.cont.err.errors.strNombre.kind);
        if(err.error.cont.err.errors.strNombre.kind === "unique"){
          this.error = "Esta categoria ya existe"
          document.getElementById("sinLlenar").style.display = "inline";
          setTimeout(function(){document.getElementById("sinLlenar").style.display = "none"; }, 3000);
        }else if(err.error.cont.err.errors.strNombre.kind === "required"){
          this.error = "Los datos no han sido llenados"
          document.getElementById("sinLlenar").style.display = "inline";
          setTimeout(function(){document.getElementById("sinLlenar").style.display = "none"; }, 3000);
        }
      })
    }
    
  }
  refresh(){
    this.obtener();
  }

  acciones(id){
    document.getElementById("exportar").style.display = "inline";
    setTimeout(function(){document.getElementById("exportar").style.display = "none"; }, 7000);
    localStorage.clear();
    localStorage.setItem("idCategoria",id);
  }
  editar(){
    document.getElementById("exportar").style.display = "none";
    document.getElementById("btn-agregar").style.display = "none";
    document.getElementById("cancelar-agregar").style.display = "none";
    document.getElementById("btn-guardar").style.display = "inline";
    document.getElementById("cancelar-editar").style.display = "inline";
    let idCategoria = localStorage.getItem("idCategoria");
    this.rest.obtenerCategoriaId(idCategoria).subscribe((data:{cont:{categoria}})=>{
      console.log(data.cont.categoria[0].strNombre);
      this.cat = data.cont.categoria[0];
    })
  }
  editarCategoria(){
    this.rest.actualizarCategoria( localStorage.getItem("idCategoria"),this.cat).subscribe((data:{cont})=>{
      console.log(data);
      window.location.reload();
    })
  }
  reload(){
    window.location.reload();
  }
  desactivar(){
    let idCategoria = localStorage.getItem("idCategoria");
    this.rest.obtenerCategoriaId(idCategoria).subscribe((data:{cont:{categoria}})=>{
      console.log(data.cont.categoria[0].blnActivo);
      if(data.cont.categoria[0].blnActivo == false){
        this.rest.activarCategoria(idCategoria).subscribe((data:{cont})=>{
          console.log(data);
          this.obtener()
          document.getElementById("exportar").style.display = "none";
        })
      }else{
        this.rest.eliminarCategoria(idCategoria).subscribe((data:{cont})=>{
             console.log(data);
             this.obtener()
             document.getElementById("exportar").style.display = "none";
        })
      }
    })
  }
}
