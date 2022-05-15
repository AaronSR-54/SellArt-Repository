import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pinturas, PinturaTipos } from '../models/interfaces';
import { PinturaResponse } from '../models/pinturas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PinturasService {

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getPinturas(): Observable<Pinturas> {
    return this.http.get<any>(`${this.url}/pinturas?populate=*`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: PinturaResponse) => {
          return {
            id: item.id,
            name: item.attributes.name.toLocaleUpperCase(),
            price_int: Math.trunc(item.attributes.price),
            price_dec: Math.round(100 * (item.attributes.price - Math.floor(item.attributes.price))),
            image: {
              name: item.attributes.image.data.attributes.name,
              url: item.attributes.image.data.attributes.url,
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
        return response.data.map((item: PinturaResponse) => {
          return {
            id: item.id,
            name: item.attributes.name,
          }
      })
    })
  )}

}
