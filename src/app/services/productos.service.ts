import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccesorioTipos, FiguraTipos, PinturaTipos, Producto, Productos, User } from '../models/interfaces';
import { ProductoResponse } from '../models/productos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = environment.apiBaseUrl;
  public productosArtista : Productos = [];

  constructor(private http: HttpClient) { }

  getPinturas(): Observable<Productos> {
    return this.http.get<any>(`${this.url}/productos?populate=*&filters[producto_tipo]=3`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name.toLocaleUpperCase(),
            price_int: Math.trunc(item.attributes.price),
            price_dec: Math.round(100 * (item.attributes.price - Math.floor(item.attributes.price))),
            description: item.attributes.description,
            image: {
              name: item.attributes.image.data.attributes.name,
              url: "http://localhost:1337" + item.attributes.image.data.attributes.url,
            },
            pintura_tipo: {
              id: item.attributes.pintura_tipo.data.id,
              name: item.attributes.pintura_tipo.data.attributes.name,
            }
          }
        })
      })
    )
  }

  getPinturaTipos(): Observable<PinturaTipos> {
    return this.http.get<any>(`${this.url}/pintura-tipos`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name,
          }
      })
    })
  )}

  getFiguras(): Observable<Productos> {
    return this.http.get<any>(`${this.url}/productos?populate=*&filters[producto_tipo]=2`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name.toLocaleUpperCase(),
            price_int: Math.trunc(item.attributes.price),
            price_dec: Math.round(100 * (item.attributes.price - Math.floor(item.attributes.price))),
            description: item.attributes.description,
            image: {
              name: item.attributes.image.data.attributes.name,
              url: "http://localhost:1337" + item.attributes.image.data.attributes.url,
            },
            figura_tipo: {
              id: item.attributes.figura_tipo.data.id,
              name: item.attributes.figura_tipo.data.attributes.name,
            }
          }
        })
      })
    )
  }

  getFiguraTipos(): Observable<FiguraTipos> {
    return this.http.get<any>(`${this.url}/tipos-figuras`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name,
          }
      })
    })
  )}

  getAccesorios(): Observable<Productos> {
    return this.http.get<any>(`${this.url}/productos?populate=*&filters[producto_tipo]=1`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name.toLocaleUpperCase(),
            price_int: Math.trunc(item.attributes.price),
            price_dec: Math.round(100 * (item.attributes.price - Math.floor(item.attributes.price))),
            description: item.attributes.description,
            image: {
              name: item.attributes.image.data.attributes.name,
              url: "http://localhost:1337" + item.attributes.image.data.attributes.url,
            },
            accesorio_tipo: {
              id: item.attributes.accesorio_tipo.data.id,
              name: item.attributes.accesorio_tipo.data.attributes.name,
            }
          }
        })
      })
    )
  }

  getAccesorioTipos(): Observable<AccesorioTipos> {
    return this.http.get<any>(`${this.url}/accesorio-tipos`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name,
          }
      })
    })
  )}

  getAllProductos(): Observable<Productos> {
    return this.http.get<any>(`${this.url}/productos?populate=*`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: ProductoResponse) => {
          return {
            id: item.id,
            name: item.attributes.name.toLocaleUpperCase(),
            price_int: Math.trunc(item.attributes.price),
            price_dec: Math.round(100 * (item.attributes.price - Math.floor(item.attributes.price))),
            description: item.attributes.description,
            image: {
              name: item.attributes.image.data.attributes.name,
              url: "http://localhost:1337" + item.attributes.image.data.attributes.url,
            },
            producto_tipo: {
              id: item.attributes.producto_tipo.data.id,
              name: item.attributes.producto_tipo.data.attributes.name,
            },
          }
        })
      })
    )
  }

  // getProductosArtista(artista: User): Observable<Productos>{
  //   artista.productos.forEach((producto)=>{
  //     return this.http.get<any>(`${this.url}/productos/${producto.id}`)
  //   })



  // }
}
