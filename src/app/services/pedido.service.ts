import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrito, Direccion, Tarjeta } from '../models/interfaces';
import { PedidoRequest, ProductoRequest } from '../models/pedido.interfaces';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  private url = environment.apiBaseUrl;
  constructor(private loginService : LoginService, private http: HttpClient) { }

  tramitarPedido(carrito:Carrito, direccion:Direccion, tarjeta:Tarjeta){
    let idProductos : number[] = [];
    let pedidoRequest : PedidoRequest;

    carrito.forEach((producto)=>{
      this.setPedidoProducto(producto).subscribe((res)=>{idProductos.push(res.data.id)})
    })

    if(tarjeta==null){
      pedidoRequest = {
        data : {
          user : this.loginService.currentUserValue.id,
          Direccion : direccion.calle + ", " + direccion.piso,
          Localidad : direccion.poblacion + " - " + direccion.cp + ", " + direccion.provincia + ", " + direccion.pais,
          MetodoPago : "efectivo",
          NumTarjeta : "",
          CadTarjeta : "",
          pedido_productos : idProductos
        }
      }
    }else{
      pedidoRequest = {
        data : {
          user : this.loginService.currentUserValue.id,
          Direccion : direccion.calle + ", " + direccion.piso,
          Localidad : direccion.poblacion + " - " + direccion.cp + ", " + direccion.provincia + ", " + direccion.pais,
          MetodoPago : "tarjeta",
          NumTarjeta : tarjeta.numero,
          CadTarjeta : tarjeta.fecha,
          pedido_productos : idProductos
        }
      }
    }

    return this.http.post(`${this.url}/pedidos`, pedidoRequest)
  }
  
  setPedidoProducto(producto:any):Observable<any>{
    let productoRequest : any = {
      data:{
        name: producto.name,
        price_int: producto.price_int,
        price_dec: producto.price_dec,
        image: producto.image.id,
        cantidad: producto.cantidad,
      },
    };
    console.log("🚀 ~ file: pedido.service.ts ~ line 64 ~ PedidoService ~ setPedidoProducto ~ productoRequest", productoRequest)
    return this.http.post(`${this.url}/pedido-productos`, productoRequest)
  }
}
