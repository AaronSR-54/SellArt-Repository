import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Users } from '../models/interfaces';
import { UserResponse } from '../models/users.interfaces.';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogged!: User;

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // getUsers(): Observable<Users> {
  //   return this.http.get<any>(`${this.url}/users?populate=*`)
  //   .pipe(
  //     map((response: any) => {
  //       return response.map((item: UserResponse) => {
  //         return {
  //           id: item.id,
  //           username: item.username,
  //           password: item.password,
  //           email: item.email,
  //           biography: item.biography,
  //           avatar: {
  //               name: item.avatar?.name,
  //               url: "http://localhost:1337" + item.avatar?.url,
  //           },
  //           productos: item.productos,
  //           role: item.role,
  //         }
  //       })
  //     })
  //   )
  // }

  login(username:string, password:string){
    return new Promise((resolve, reject) => {
      this.loginAuth(username, password).subscribe(
        (res) => {
          this.userLogged = res;
          console.log(res);
          resolve('completed');
        },
        (error) => {
          reject(error)
        }
      );
    })
  }

  loginAuth(identifier:string, password:string){
    return this.http.post('http://localhost:1337/api/auth/local', {identifier, password}).pipe(
      map((item:any)=>{
        return{
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




}
