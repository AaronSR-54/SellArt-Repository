import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/users.interfaces.';
import { Productos, User, Users } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  public artista: User | null = null;

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getArtistas(): Observable<Users> {
    return this.http.get<any>(`${this.url}/users?populate=*&filters[role]=3`)
    .pipe(
      map((response: any) => {
        return response.map((item: UserResponse) => {
          return {
            id: item.id,
            username: item.username,
            email: item.email,
            biography: item.biography,
            avatar: {
                name: item.avatar?.name,
                url: "http://localhost:1337" + item.avatar?.url,
            },
            productos: item.productos,
          }
        })
      })
    )
  }

}
