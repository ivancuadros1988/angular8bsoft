import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router,CanActivate } from '@angular/router';
import { Usuario } from '../model/usuario';
import { LoginService } from '../login/login.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuardService implements CanActivate{
  
  usuario:Usuario;
  
  constructor(private router:Router) { }

  canActivate(){
    this.usuario = new Usuario();
    this.usuario.token = sessionStorage.getItem('token');
    if(sessionStorage.getItem('token')!=null)
    {
      console.log("token:",sessionStorage.getItem('token'));
      return true
    }
    else
    {
      console.log("no hay token");
      this.router.navigate(['/mlogin']);
      return false;
    }
  }

}
