import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosAdminComponent implements OnInit {

  users? : any = [];

  selectedUser? : {
    id: 0,
    username: "",
    biography: "",
    email: "",
    avatar: {
        name: "",
        url: "",
    },
    productos: [],
    role: {
      id: 0,
      name: "",
    }
  };

  constructor(private loginService : LoginService, private productosService : ProductosService) { }

  ngOnInit(): void {
    this.getUsers()
    this.selectedUser = this.users[0];
  }

  getUsers(){
    return new Promise(resolve=>{
      this.loginService.getUsers().subscribe((res:any)=>{
        res.forEach((user:any)=>{
          if(user.avatar?.name == null){
            user.avatar!.url = "../../assets/images/avatar.svg";
            user.avatar!.name = "Avatar.svg"
          }
          this.users?.push(user)
          this.users?.length == res.length ? resolve : {}
        })
      })
    }) 
  }
  
  formatDate(date: Date){
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
  }
  
  selectUser(user:any){
    this.selectedUser = user;
  } 

  blockUser(user:any){
    let requestUser = {
      role: 1,
      blocked : true,
    }

    this.loginService.editUser(requestUser, user.id).subscribe(()=>{
      if(user.productos.length!=0){
        user.productos.forEach((producto:any)=>{
          this.productosService.removeProducto(producto.id).subscribe()
        })
      }
      this.users.length = 0;
      this.getUsers()
    })
  }
}
