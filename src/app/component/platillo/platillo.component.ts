import { Component, OnInit } from '@angular/core';
import {ServiciosService} from '../../servicios.service';
import {PlatilloModels} from '../../models/platillo.model';
import { HttpErrorResponse } from '@angular/common/http';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent implements OnInit {

  constructor(public rest : ServiciosService) { }
  modelPlatillo : PlatilloModels = new PlatilloModels();
  platillo: any = [];
  error: any = [];
  searchText = '';

  ngOnInit(){
    console.log(localStorage.getItem("idCategoria"));
    this.obtenerPlatillo();
  }
  cancelar(){
    this.modelPlatillo.strDescripcion = "";
    this.modelPlatillo.strNombre = "";
    this.modelPlatillo.nmbPiezas = "";
    this.modelPlatillo.nmbPrecio = "";
    this.modelPlatillo.strIngredientes = "";
  }
obtenerPlatillo(){
  this.rest.obtenerPlatilloIdCategoria(localStorage.getItem("idCategoria")).subscribe((data:{cont:{platillo}})=>{
     console.log(data.cont.platillo);
     this.platillo = data.cont.platillo;
  })
}
registrarPlatillo(){
  if(this.modelPlatillo.strNombre === undefined || this.modelPlatillo.strDescripcion === undefined){
    this.error = "Los datos no han sido llenados"
    document.getElementById("sinLlenar").style.display = "inline";
    setTimeout(function(){document.getElementById("sinLlenar").style.display = "none"; }, 3000);
  }else{
    this.modelPlatillo.idCategoria = localStorage.getItem("idCategoria");
    console.log(this.modelPlatillo);
    this.rest.agregarPlatillo(this.modelPlatillo).subscribe((data:{cont})=>{
     console.log(data.cont)
     this.obtenerPlatillo();
    },(err: HttpErrorResponse)=>{
      console.log(err);
      if(err.error.cont.err.errors.strNombre.kind === "unique"){
        this.error = "Esta categoria ya existe"
        document.getElementById("sinLlenar").style.display = "inline";
        setTimeout(function(){document.getElementById("sinLlenar").style.display = "none"; }, 3000);
      }else if(err.error.cont.err.errors.strNombre.kind === "required"){
        this.error = "Los datos no han sido llenados"
        document.getElementById("sinLlenar").style.display = "inline";
        setTimeout(function(){document.getElementById("sinLlenar").style.display = "none"; }, 3000);
      }
    });
  }
 
}
refresh(){
  this.obtenerPlatillo();
}

acciones(id){
  document.getElementById("exportarPlatillo").style.display = "inline";
  setTimeout(function(){document.getElementById("exportarPlatillo").style.display = "none"; }, 7000);
  localStorage.removeItem("idPlatillo");
  localStorage.setItem("idPlatillo",id);
}
editar(){
  document.getElementById("exportarPlatillo").style.display = "none";
  document.getElementById("btn-agregarPlatillo").style.display = "none";
  document.getElementById("cancelar-agregarPlatillo").style.display = "none";
  document.getElementById("btn-guardarPlatillo").style.display = "inline";
  document.getElementById("cancelar-editarPlatillo").style.display = "inline";
  let idPlatillo = localStorage.getItem("idPlatillo");
  this.rest.obtenerPlatilloId(idPlatillo).subscribe((data:{cont:{platillo}})=>{
    console.log(data.cont.platillo[0]);
    this.modelPlatillo = data.cont.platillo[0];
  })
}
editarPlatillo(){
  this.rest.actualizarPlatillo( localStorage.getItem("idPlatillo"),this.modelPlatillo).subscribe((data:{cont})=>{
    console.log(data);
    window.location.reload();
  })
}
reload(){
  window.location.reload();
}
desactivarPlatillo(){
  let idPlatillo = localStorage.getItem("idPlatillo");
  this.rest.obtenerPlatilloId(idPlatillo).subscribe((data:{cont:{platillo}})=>{
    console.log(data.cont.platillo[0].blnActivo);
    if(data.cont.platillo[0].blnActivo == false){
      this.rest.activarPlatillo(idPlatillo).subscribe((data:{cont})=>{
        console.log(data);
        this.obtenerPlatillo();
        document.getElementById("exportarPlatillo").style.display = "none";
      })
    }else{
      this.rest.eliminarPlatillo(idPlatillo).subscribe((data:{cont})=>{
           console.log(data);
           this.obtenerPlatillo();
           document.getElementById("exportarPlatillo").style.display = "none";
      })
    }
  })
}
//***************Exportaciones en PDF y EXCEL *********************************//
imrpimirLista(){
  let nombreCat = this.platillo[0].idCategoria.strNombre;
    var doc = new jsPDF('portrait', 'px', 'a4');  
  window.document.getElementById("tablita").style.display = "inline";        
  var source = window.document.getElementById("tablita");
  doc.fromHTML(source);
  setTimeout(function(){document.getElementById("tablita").style.display = "none"; }, 0.1);
  doc.save(`platillosDe_${nombreCat}.pdf`);
  document.getElementById("funcion").style.display="none";

    }
    pdf_excel(){
      document.getElementById("funcion").style.display="inline"; 
      setTimeout(function(){document.getElementById("funcion").style.display = "none"; }, 3500);
    }
    
    exportExcel(tableID, filename = ''){
      let nombreCat = this.platillo[0].idCategoria.strNombre;
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
      
      // Specify file name
      filename = filename?filename+'.xls': `platillosDe_${nombreCat}.xls`;
      
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

}
