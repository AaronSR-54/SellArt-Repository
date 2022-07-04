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
  constructor(private http: HttpClient) { }

  tramitarPedido(request:any){
    return this.http.post(`${this.url}/pedidos`, request)
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
    return this.http.post(`${this.url}/pedido-productos`, productoRequest)
  }
}
