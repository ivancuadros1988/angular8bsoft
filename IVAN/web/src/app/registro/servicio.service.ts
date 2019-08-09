import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../model/usuario';
import { Servicio } from '../model/app.servicio';
import { Transaccion } from '../model/transaccion';

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') 
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public servicioUrl = 'https://localhost:44318/api/invoice';  // URL to web API  
  public servicios: Servicio[] = [];  
  public servicio: Servicio; 
  public  errorMessage: string;

  constructor(private http: HttpClient) { }

  public getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioUrl+"/listdebts/1", httpOptions).pipe(
    catchError(this.handleError('getServicios', [])) );
  }

  public create(servicio: Servicio): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.servicioUrl+"", JSON.stringify(servicio), httpOptions).pipe(
    tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
    catchError(this.handleError<Transaccion>('create'))
    );  
  }

  public update(servicio: Servicio): Observable<Transaccion> { 
    return this.http.post<Transaccion>(this.servicioUrl+"/paydebt",JSON.stringify(servicio), httpOptions).pipe(
    tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
    catchError(this.handleError<Transaccion>('update'))
    ); 
  }

  public reverse(servicio: Servicio): Observable<Transaccion> { 
    return this.http.post<Transaccion>(this.servicioUrl+"/reversepayment",JSON.stringify(servicio), httpOptions).pipe(
    tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
    catchError(this.handleError<Transaccion>('reverse'))
    ); 
  }

  public deleteServicio(id: number):Observable<Transaccion> { 
    return this.http.delete<Transaccion>(this.servicioUrl+"/servicio/delete/"+id,httpOptions).pipe( 
      tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
    catchError(this.handleError<Transaccion>('deleteHero'))
    ) 
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(error); // log to console instead
    return of(result as T);
    };  
  }
}
