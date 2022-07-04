import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carrito, Direccion, Tarjeta } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  
  carrito: Carrito = this.carritoService.carritoValue;
  total: number = 0;
  
  step: number = 1;
  
  message: string = "";
  // direccion : Direccion = {
  //   calle: "",
  //   piso: "",
  //   pais: "",
  //   cp: "",
  //   poblacion: "",
  //   provincia: ""
  // };
  
  // tarjeta : Tarjeta | any = {
  //   numero:"",
  //   fecha:"",
  //   cvv:""
  // };

  direccion : Direccion = {
    calle: "Francisco Valldecabres",
    piso: "61 - 1",
    pais: "España",
    cp: "46940",
    poblacion: "Manises",
    provincia: "Valencia"
  };
  
  tarjeta : Tarjeta | any = {
    numero:"874656158516",
    fecha:"2022-07",
    cvv:"126"
  };

  pago: string = "efectivo";

  constructor(private carritoService : CarritoService, 
    private pedidoService : PedidoService) { }  

  ngOnInit(): void {
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
  }

  sumarProducto(producto:any){
    this.carritoService.anadirProducto(producto);
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
  }

  restarProducto(producto:any){
    this.carritoService.quitarProducto(producto);
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
  }

  passStep(){
    let invalid2 = false;
    let invalid3 = false;

    if (this.direccion.calle=="" || 
      this.direccion.piso=="" || 
      this.direccion.pais=="" || 
      this.direccion.cp=="" || 
      this.direccion.poblacion=="" || 
      this.direccion.provincia==""
    ){
      invalid2 = true;
    }

    if(this.step==2 && invalid2){
      this.message="No pueden haber campos vacíos"
      this.step--;
    }else if(this.step==2){
      this.message=""
    }

    if (this.tarjeta.numero=="" || 
      this.tarjeta.fecha=="" || 
      this.tarjeta.cvv==""
    ){
      invalid3 = true;
    }

    if(this.step==3 && invalid3 && this.pago=="tarjeta"){
      this.message="No pueden haber campos vacíos"
      this.step--;
    }else if(this.step==3){
      this.message=""
    }

    this.step++;
  }

  returnStep(numberStep:number){
    this.step = numberStep;
  }

  tramitarPedido(){
    this.pago == "efectivo" ? this.tarjeta = null : {};
    this.pedidoService.tramitarPedido(this.carrito, this.direccion, this.tarjeta!).subscribe(
      (res:any) => {console.log(res)},
      (error:any) => {console.log(error)}
      )
  }

  onlyNumberKey(evt:any) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
  }
}
