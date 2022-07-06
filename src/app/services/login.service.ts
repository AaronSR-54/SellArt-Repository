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

  setCurrentUser(user:User){
    return new Promise((resolve) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      resolve(user);
    })
  }

  login(username:string, password:string){
    return new Promise((resolve, reject) => {
      this.loginAuth(username, password).subscribe(
        (res) => {
          this.getUser(res.id).subscribe((user)=>{
            this.setCurrentUser(user);
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
    return this.http.post(`${this.url}/auth/local`, {identifier, password}).pipe(
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

  signUp(request:any){
    return this.http.post(`${this.url}/auth/local/register`, request)
    .pipe(
      map((item:any)=>{
        return{
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          biography: item.user.biography,
          avatar: {
              name: "Avatar.svg",
              url: "../../assets/images/avatar.svg",
          },
          role: item.user.role,
        }
      })
    ) 
  }

  uploadImage(formData:FormData):Observable<any>{
    return this.http.post(`${this.url}/upload`, formData)
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}
