import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrito, Producto, ProductoCarrito} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos: Carrito = [];
  private carritoSubject: BehaviorSubject<Carrito>;
  public carrito: Observable<Carrito>;

  constructor() {
    this.carritoSubject = new BehaviorSubject<Carrito>(JSON.parse(localStorage.getItem('carrito')!));
    this.carrito = this.carritoSubject.asObservable();
  }

  public get carritoValue(): Carrito {
    return this.carritoSubject.value;
  }

  anadirProducto(producto: Producto){
    
    var productoCarrito:ProductoCarrito = {
      id: producto.id,
      name: producto.name,
      price_int: producto.price_int,
      price_dec: producto.price_dec,
      image: producto.image,
      cantidad: 0,
    }

    this.productos = this.carritoSubject.value;

    if(this.productos){
      let i=0;
      this.productos.forEach(item => {
        if(productoCarrito.id == item.id){
          productoCarrito.cantidad = item.cantidad + 1;
          this.productos[i] = productoCarrito;
        }
        i++;
      });

      if(productoCarrito.cantidad==0){
          productoCarrito.cantidad = 1;
          this.productos.push(productoCarrito);
        }
    }else{
      this.productos=[];
      productoCarrito.cantidad = 1;
      this.productos.push(productoCarrito);
    }

    localStorage.setItem('carrito', JSON.stringify(this.productos));
    window.location.reload();
  }
}