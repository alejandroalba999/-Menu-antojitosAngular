import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {CategoriaModels} from '../../models/categoria.models';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiciosService} from '../../servicios.service'
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  error : any = [];
  categoria : any = [];
  searchText = "";
  uploadedFiles: Array < File > ;
  constructor(public rest: ServiciosService, public router : Router) {}
  cat: CategoriaModels = new CategoriaModels();
  
  fileChange(element) {
    
    if(element.target.files[0].type == "application/vnd.ms-excel"){
      this.uploadedFiles = element.target.files;
      console.log (element.target.files[0].type);
    }else{
      alert("tipo de archivo no permitido");
      this.cat.strFile = "";
      console.log (element.target.files[0].type);
    }



    
  }
  
  upload() {
    if(this.cat.strFile == undefined || this.cat.strFile == null || this.cat.strFile == ''){
        alert("No fue seleccionado ningun archivo");
    }else{
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.rest.uploadFile(formData).subscribe((res)=> {
       console.log(res);
      });
    }
    
    }




  ngOnInit() {
    this.cat.blnActivo = true;
     this.obtener(); 
     console.log(this.cat.blnActivo)
  }
  cancelar(){
    this.cat.strDescripcion = "";
    this.cat.strNombre = "";
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    
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
imrpimirLista(){

var doc = new jsPDF('portrait', 'px', 'a4');  
window.document.getElementById("tablita").style.display = "inline";        
var source = window.document.getElementById("tablita");
doc.fromHTML(source);
setTimeout(function(){document.getElementById("tablita").style.display = "none"; }, 0.1);
doc.save("categorias.pdf");
document.getElementById("funcion").style.display="none";

  }
  pdf_excel(){
    document.getElementById("funcion").style.display="inline"; 
    setTimeout(function(){document.getElementById("funcion").style.display = "none"; }, 3500);
  }
  
  exportExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'categorias.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
platillo(id){
  localStorage.clear();
  localStorage.setItem("idCategoria",id);
  this.router.navigate(['platillo']);
}

}
