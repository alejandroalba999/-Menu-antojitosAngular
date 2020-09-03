import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'

const endPoint = 'http://localhost:3000/api/'
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }
  //Subir archivo//
   uploadFile(data): Observable <any>{
    return this.http.post(endPoint +'upload/subir',data);
   }
  //Apis para ruta Categoria//
  obtenerCategoria(): Observable <any>{
    return this.http.get(endPoint +'categoria/obtener');
   }
   obtenerCategoriaNombre(nombre): Observable <any>{
    return this.http.get(endPoint +'categoria/obtener/'+ nombre);
   }
   obtenerCategoriaId(id): Observable <any>{
    return this.http.get(endPoint +'categoria/obtenerId/'+ id);
   }
   agregarCategoria(product): Observable <any>{
    return this.http.post<any>(endPoint + 'categoria/registrar',product);
   }
   actualizarCategoria(id, product): Observable <any>{
    return this.http.put(endPoint + 'categoria/actualizar/' + id, product);
   }
   eliminarCategoria(id): Observable <any>{
    return this.http.delete(endPoint +'categoria/eliminar/'+ id);
   }
   activarCategoria(id): Observable <any>{
    return this.http.delete(endPoint +'categoria/activar/'+ id);
   }
//Apis para ruta Categoria//

//Apis para ruta Platillos//
obtenerPlatillo(): Observable <any>{
  return this.http.get(endPoint +'platillo/obtener');
 }
 obtenerPlatilloIdCategoria(idCategoria): Observable <any>{
  return this.http.get(endPoint +'platillo/obtenerIdCategoria/'+ idCategoria);
 }
 obtenerPlatilloId(id): Observable <any>{
  return this.http.get(endPoint +'platillo/obtenerId/'+ id);
 }
 agregarPlatillo(product): Observable <any>{
  return this.http.post<any>(endPoint + 'platillo/registrar',product);
 }
 actualizarPlatillo(id, product): Observable <any>{
  return this.http.put(endPoint + 'platillo/actualizar/' + id, product);
 }
 eliminarPlatillo(id): Observable <any>{
  return this.http.delete(endPoint +'platillo/eliminar/'+ id);
 }
 activarPlatillo(id): Observable <any>{
  return this.http.delete(endPoint +'platillo/activar/'+ id);
 }
//Apis para ruta Platillos//

}
