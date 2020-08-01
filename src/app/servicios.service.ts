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
   agregarCategoria(product): Observable <any>{
    return this.http.post<any>(endPoint + 'categoria/agregar',product);
   }
}
