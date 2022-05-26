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

  public totalCarrito: number = 0;

  constructor() {
    this.carritoSubject = new BehaviorSubject<Carrito>(JSON.parse(localStorage.getItem('carrito')!));
    this.carrito = this.carritoSubject.asObservable();
    this.totalCarrito = this.calculateTotal();
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
    this.carritoSubject = new BehaviorSubject<Carrito>(JSON.parse(localStorage.getItem('carrito')!));
    this.carrito = this.carritoSubject.asObservable();
    this.totalCarrito = this.calculateTotal();
  }

  quitarProducto(producto: Producto){
    var productoCarrito: ProductoCarrito = {
      id: producto.id,
      name: producto.name,
      price_int: producto.price_int,
      price_dec: producto.price_dec,
      image: producto.image,
      cantidad: 0,
    }

    this.productos = this.carritoSubject.value;

    if (this.productos) {
      let i = 0;
      this.productos.forEach(item => {
        if (productoCarrito.id == item.id) {
          if (item.cantidad > 1) {
            productoCarrito.cantidad = item.cantidad - 1;
            this.productos[i] = productoCarrito;
          }
          else {
            this.productos.splice(i, 1);
          }
        }
        i++;
      });
    }

    if (this.productos.length == 0) {
      localStorage.setItem('carrito', JSON.stringify(null));
    } else {
      localStorage.setItem('carrito', JSON.stringify(this.productos));
    }

    this.carritoSubject = new BehaviorSubject<Carrito>(JSON.parse(localStorage.getItem('carrito')!));
    this.carrito = this.carritoSubject.asObservable();
    this.totalCarrito = this.calculateTotal();
  }

  calculateTotal() : number{
    let total:number = 0;

    if(this.carritoSubject.value!=null){
      this.carritoSubject.value.forEach((producto)=>{
        let precio = producto.price_int + parseInt(producto.price_dec)/100;
        total = total + precio*producto.cantidad;
        total = Math.round((total + Number.EPSILON) * 100) / 100;
      })
    }
    
    return total;
  }

}