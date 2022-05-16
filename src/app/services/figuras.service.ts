import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiguraResponse } from '../models/figuras.interfaces';
import { Figuras, FiguraTipos} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FigurasService {

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getFiguras(): Observable<Figuras> {
    return this.http.get<any>(`${this.url}/figuras?populate=*`)
    .pipe(
      map((response: any) => {
        return response.data.map((item: FiguraResponse) => {
          return {
            id: item.id,
            name: item.attributes.name.toLocaleUpperCase(),
            price_int: Math.trunc(item.attributes.price),
            price_dec: Math.round(100 * (item.attributes.price - Math.floor(item.attributes.price))),
            description: item.attributes.description,
            image: {
              name: item.attributes.image.data.attributes.name,
              url: item.attributes.image.data.attributes.url,
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
        return response.data.map((item: FiguraResponse) => {
          return {
            id: item.id,
            name: item.attributes.name,
          }
      })
    })
  )}

}
