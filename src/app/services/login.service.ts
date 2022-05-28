import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Users } from '../models/interfaces';
import { UserResponse } from '../models/users.interfaces.';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUser(idUser:number): Observable<User> {
    return this.http.get<any>(`${this.url}/users/${idUser}?populate=*`)
    .pipe(
      map((item: UserResponse) => {
        console.log(this.url + item.avatar?.url)
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
            role: item.role,
          }
        })
    )
  }

  login(username:string, password:string){
    return new Promise((resolve, reject) => {
      this.loginAuth(username, password).subscribe(
        (res) => {
          this.getUser(res.id).subscribe((user)=>{
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            resolve(user);
          });
        },
        (error) => {
          reject(error)
        }
      );
    })
  }

  loginAuth(identifier:string, password:string){
    return this.http.post(`${this.url}/api/auth/local`, {identifier, password}).pipe(
      map((item:any)=>{
        return{
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          biography: item.user.biography,
          avatar: {
              name: item.user.avatar?.name,
              url: "http://localhost:1337" + item.user.avatar?.url,
          },
          productos: item.user.productos,
          role: item.user.role,
        }
      })
    ) 
  }

  getUploads(){
    return this.http.get(`${this.url}/upload/files`).pipe(map((item:any)=>{
      return{
        item
      }
    }))
  }

  async signUp(image:any){
    return this.http.post('http://localhost:1337/api/auth/local/register', {
      username: "prueba",
      email: "prueba@email.com",
      password: "12345678",
      biography: "Hola amihos",
      avatar: image
    }).pipe(
      map((item:any)=>{
        return{
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          biography: item.user.biography,
          avatar: {
              name: item.user.avatar?.name,
              url: "http://localhost:1337" + item.user.avatar?.url,
          },
          productos: item.user.productos,
          role: item.user.role,
        }
      })
    ) 
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}