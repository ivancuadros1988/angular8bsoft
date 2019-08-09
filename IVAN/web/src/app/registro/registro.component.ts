import { Component, OnInit } from '@angular/core';
import { Cliente,Producto,Servicio } from '../model/app.servicio';
import { ServicioService } from './servicio.service'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [ServicioService] 
})
export class RegistroComponent implements OnInit {

  servicios:Servicio[]=[];
  servicio:Servicio;
  serviciotmp:Servicio;
  cliente:Cliente;
  errorMessage:string;

  page:number;
  p:Servicio=new Servicio();
  
  constructor(private service:ServicioService) { }

  ngOnInit() {
    this.servicio=new Servicio();
    this.serviciotmp=new Servicio();
    this.servicio.indSave=null;
    this.getServicios();
  }

  public getServicios(){
    this.service.getServicios().subscribe(
    servicios=>{
      console.log(servicios);
      this.servicios=servicios;
      this.serviciotmp=servicios[0];
    },
    error=>{
      this.errorMessage=<any>error;
    }
    );
  }

  public submit() {
    if(this.servicio.indSave===null)
    {
      this.servicio.cliente = this.serviciotmp.cliente;
      this.servicio.producto = this.serviciotmp.producto;
      this.servicio.estado='0'; 
      console.log('Saving Producto', this.servicio);

      this.create();
    }
    else
    {
      console.log('Producto update ', this.servicio);
      //this.updateProducto();
    }
    //this.resetear();
  }

  public create(){
    this.service.create(this.servicio).subscribe( 
      transaccion=>{
        console.log(transaccion); 
        this.getServicios(); 
      },
    error=>{this.errorMessage=<any>error;} 
    );
  }

  public update(servicio:Servicio){
    servicio.estado = "1";

    console.log("DATOS DE SERVICIO");
    console.log(servicio);

    this.service.update(servicio).subscribe(
    transaccion=>{ 
      console.log(transaccion);
      this.getServicios(); 
    },
    error=>{this.errorMessage=<any>error;} );
  }

  public reverse(servicio:Servicio){
    servicio.estado = "0";
   
    this.service.reverse(servicio).subscribe(
    transaccion=>{ 
      console.log(transaccion);
      this.getServicios(); 
    },
    error=>{this.errorMessage=<any>error;} );
  }
  
  public delete(codigo){ console.log("codigo",codigo);
    this.service.deleteServicio(codigo).subscribe( transaccion=>
    {
      console.log(transaccion); this.getServicios();
    }, error=>{
      this.errorMessage=<any>error;
    }
    ); 
  }
 
}
