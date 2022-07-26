import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrito, Direccion, Tarjeta } from '../models/interfaces';
import { PedidoProductoResponse, PedidoResponse} from '../models/pedido.interfaces';
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

  updatePedido(idPedido:number, request:any){
    return this.http.put(`${this.url}/pedidos/${idPedido}`, request)
  }
  
  setPedidoProducto(producto:any):Observable<any>{
    let productoRequest : any = {
      data:{
        name: producto.name,
        price_int: producto.price_int,
        price_dec: producto.price_dec,
        image: producto.image.id,
        cantidad: producto.cantidad,
      }
    };
    return this.http.post(`${this.url}/pedido-productos`, productoRequest)
  }

  getUserPedidos(userId:number){
    return this.http.get<any>(`${this.url}/pedidos?populate=*&filters[user]=${userId}`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: PedidoResponse) => {
          return {
            id : item.id,
            direccion : item.attributes.direccion,
            localidad : item.attributes.localidad,
            metodoPago : item.attributes.metodoPago,
            numTarjeta : item.attributes.numTarjeta,
            cadTarjeta : item.attributes.cadTarjeta,
            fecha : item.attributes.createdAt,
            estado: item.attributes.estado,
            pedidoProductos : item.attributes.pedido_productos.data.map(
              (producto : any) => {
                return {
                  id : producto.id
                }
            })
          }
        })
      })
    )
  }

  getPedidos(){
    return this.http.get<any>(`${this.url}/pedidos?populate=*`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: PedidoResponse) => {
          return {
            id : item.id,
            direccion : item.attributes.direccion,
            localidad : item.attributes.localidad,
            metodoPago : item.attributes.metodoPago,
            numTarjeta : item.attributes.numTarjeta,
            cadTarjeta : item.attributes.cadTarjeta,
            fecha : item.attributes.createdAt,
            estado: item.attributes.estado,
            pedidoProductos : item.attributes.pedido_productos.data.map(
              (producto : any) => {
                return {
                  id : producto.id
                }
            }),
            user : {
              id: item.attributes.user.data.id,
              username : item.attributes.user.data.attributes.username,
              email : item.attributes.user.data.attributes.email,
            }
          }
        })
      })
    )
  }

  getPedidoProducto(productoId:number){
    return this.http.get<any>(`${this.url}/pedido-productos/${productoId}?populate=*`)
    .pipe(
      map((item: PedidoProductoResponse) => {
          return {
            id: item.data.id,
            name : item.data.attributes.name,
            price_int : item.data.attributes.price_int,
            price_dec : item.data.attributes.price_dec,
            image : {
                id: item.data.attributes.image.data.id,
                name: item.data.attributes.image.data.attributes.name,
                url: item.data.attributes.image.data.attributes.url,
            },
            cantidad : item.data.attributes.cantidad,
          }
      })
    )
  }

}
