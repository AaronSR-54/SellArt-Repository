import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccesorioResponse } from '../models/accesorios.interfaces';
import { Accesorios, AccesorioTipos } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAccesorios(): Observable<Accesorios> {
    return this.http.get<any>(`${this.url}/accesorios?populate=*`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: AccesorioResponse) => {
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
        return response.data.map((item: AccesorioResponse) => {
          return {
            id: item.id,
            name: item.attributes.name,
          }
      })
    })
  )}
}
