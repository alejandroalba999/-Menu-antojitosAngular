import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
const endPoint = 'http://localhost:3000/api/'
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }
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
}
