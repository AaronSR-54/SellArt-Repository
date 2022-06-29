import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carrito, Direccion, Tarjeta } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  
  carrito: Carrito = this.carritoService.carritoValue;
  total: number = 0;
  
  step: number = 3;
  
  message: string = "";
  direccion : Direccion = {
    calle: "",
    piso: "",
    pais: "",
    cp: "",
    poblacion: "",
    provincia: ""
  };
  
  tarjeta : Tarjeta = {
    numero:"",
    fecha:"",
    cvv:""
  };

  pago: string = "efectivo";

  constructor(private carritoService : CarritoService) { }  

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

  changeStep(){
    let invalid = false;
    
    if (this.direccion.calle=="" || 
    this.direccion.piso=="" || 
    this.direccion.pais=="" || 
    this.direccion.cp=="" || 
    this.direccion.poblacion=="" || 
    this.direccion.provincia==""){
      invalid = true;
    }

    if(this.step==2 && invalid){
      this.message="No pueden haber campos vacíos"
      this.step--;
    }
    this.step++;
  }

  onChange(){
    console.log(this.tarjeta)
  }

  onlyNumberKey(evt:any) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
}
