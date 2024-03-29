import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/users.interfaces.';
import { Productos, User, Users } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  public artista: Observable<User>;;
  private artistaSubject: BehaviorSubject<User>;
  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.artistaSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('artista')!));
    this.artista = this.artistaSubject.asObservable();
  }

  public get artistaValue(): User {
    return this.artistaSubject.value;
  }

  getArtistas(): Observable<Users> {
    return this.http.get<any>(`${this.url}/users?populate=*&filters[role]=3&filters[role]=4`)
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

  setArtista(artista:User){
    localStorage.setItem('artista', JSON.stringify(artista));
    this.artistaSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('artista')!));
    this.artista = this.artistaSubject.asObservable();
  }

  solicitarArtista(request:any){
    return this.http.post<any>(`${this.url}/solicitudes-artista`, request)
  }

  getSolicitudes(){
    return this.http.get<any>(`${this.url}/solicitudes-artista?populate=*`)
  }

  removeSolicitud(idSolicitud : number){
    return this.http.delete<any>(`${this.url}/solicitudes-artista/${idSolicitud}`)
  }

  anadirProductoaArtista(idProducto:number, user:User) {

    let productosId : number[] = []

    user.productos.forEach((producto:any)=>productosId.push(producto.id))

    let request = {
      productos: [...productosId, idProducto]
    }
    return this.http.put<any>(`${this.url}/users/${user.id}?populate=*`,request)
  }
}
