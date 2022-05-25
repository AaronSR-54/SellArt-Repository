import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito, User } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  password: string = '';

  messageUser: string = 'Por favor, rellena el usuario';
  messagePassword: string = 'Por favor, rellena la contraseña';
  messageLogin: string = 'Usuario y/o contraseña incorrectos';

  invalidLogin: boolean = false;
  invalidUser: boolean = false;
  invalidPassword: boolean = false;

  user: User = this.loginService.currentUserValue;
  carrito: Carrito = this.carritoService.carritoValue;

  constructor(
    private loginService: LoginService, 
    private router:Router,
    private carritoService : CarritoService) { }

  ngOnInit(): void { 
    if(this.user.avatar.name == null || this.user.avatar.name == null){
      this.user.avatar.url = "../../assets/images/avatar.svg";
      this.user.avatar.name = "Avatar.svg"
    }
  }

  login(){
    if(!this.invalidUser && !this.invalidPassword){
      this.loginService.login(this.username, this.password)
      .then( () => {
        this.user = this.loginService.currentUserValue;
        this.invalidLogin = false;
        window.location.reload();
        
      })
      .catch((error)=>{
        this.invalidLogin = true;
        console.log(error)
      });
    }
  }

  usernameChange(){
    let inputUser = document.getElementById('username');
    if(this.username==''){
      this.invalidUser = true;
      inputUser?.classList.add("is-invalid");
    }else{
      this.invalidUser = false;
      inputUser?.classList.remove("is-invalid");
    }
  }

  passwordChange(){
    let inputPassword = document.getElementById('password');
    if(this.password==''){
      this.invalidPassword = true;
      inputPassword?.classList.add("is-invalid");
    }else{
      this.invalidPassword = false;
      inputPassword?.classList.remove("is-invalid");
    }
  }

  signup(){

  }

  logout(){
    this.loginService.logout();
    window.location.reload();
  }

  openCarrito(){
    console.log(this.carrito);
  }
}
