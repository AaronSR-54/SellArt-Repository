import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito, Producto, User } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  passwordConf: string = '';

  messageUser: string = 'Por favor, rellena el usuario';
  messageEmail: string = 'Por favor, rellena el email';
  messagePassword: string = 'Por favor, rellena la contraseña';
  messagePasswordConf: string = 'Por favor, rellena la contraseña';
  messageLogin: string = 'Usuario y/o contraseña incorrectos';

  invalidLogin: boolean = false;
  invalidSignup: boolean = false;
  invalidUser: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  invalidPasswordConf: boolean = false;

  user: User = this.loginService.currentUserValue;
  carrito: Carrito = this.carritoService.carritoValue;

  total: number = 0;

  constructor(
    private loginService: LoginService, 
    private carritoService : CarritoService,
    private router : Router
    ) { }
    
  ngOnInit(): void { 
    if(this.user){
      if(this.user.avatar?.name == null){
        this.user.avatar!.url = "../../assets/images/avatar.svg";
        this.user.avatar!.name = "Avatar.svg"
      }
    }
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
  }

  login(){
    this.checkUsernameLogin()
    this.checkPasswordLogin()

    if(!this.invalidUser && !this.invalidPassword){
      this.loginService.login(this.username, this.password)
      .then( () => {
        this.user = this.loginService.currentUserValue;
        this.invalidLogin = false;
        window.location.reload();
      })
      .catch((error)=>{
        this.invalidLogin = true;
        this.password = "";
        console.log(error)
      });
    }
  }
 
  signup(){
    this.checkUsername()
    this.checkEmail()
    this.checkPassword()
    this.checkPasswordConf()

    if(!this.invalidUser && !this.invalidEmail && !this.invalidPassword && !this.invalidPasswordConf){
      let userRequest = {
          username: this.username,
          email: this.email,
          password: this.password
      }
      this.loginService.signUp(userRequest).subscribe((res:any)=>{
        this.loginService.setCurrentUser(res).then(()=>{
          window.location.reload();
        });
      })
    }
  }

  checkUsernameLogin(){
    let inputUser = document.getElementById('usernameLogin');
    if(this.username==''){
      this.invalidUser = true;
      inputUser?.classList.add("is-invalid");
      this.messageUser = 'Por favor, rellena el usuario';
    }else{
      this.invalidUser = false;
      inputUser?.classList.remove("is-invalid");
    }
  }

  checkPasswordLogin(){
    let inputPassword = document.getElementById('passwordLogin');
    if(this.password==''){
      this.invalidPassword = true;
      inputPassword?.classList.add("is-invalid");
      this.messagePassword = 'Por favor, rellena la contraseña';
    }else{
      this.invalidPassword = false;
      inputPassword?.classList.remove("is-invalid");
    }
  }

  checkUsername(){
    let inputUser = document.getElementById('username');
    if(this.username==''){
      this.invalidUser = true;
      inputUser?.classList.add("is-invalid");
      this.messageUser = 'Por favor, rellena el usuario';
    }else{
      this.invalidUser = false;
      inputUser?.classList.remove("is-invalid");
    }
  }

  checkEmail(){
    let inputEmail = document.getElementById('email');
    if(this.email==''){
      this.invalidEmail = true;
      inputEmail?.classList.add("is-invalid");
      this.messageEmail= 'Por favor, rellena el email';
    }else if(!this.email.includes("@")){
      this.invalidEmail = true;
      inputEmail?.classList.add("is-invalid");
      this.messageEmail = 'El formato del email es incorrecto';
    }else{
      this.invalidEmail = false;
      inputEmail?.classList.remove("is-invalid");
    }
  }

  checkPassword(){
    let inputPassword = document.getElementById('password');
    if(this.password==''){
      this.invalidPassword = true;
      inputPassword?.classList.add("is-invalid");
      this.messagePassword = 'Por favor, rellena la contraseña';
    }else if(this.password.length<8){
      this.invalidPassword = true;
      inputPassword?.classList.add("is-invalid");
      this.messagePassword = 'Le faltan carácteres a la contraseña';
    }else{
      this.invalidPassword = false;
      inputPassword?.classList.remove("is-invalid");
    }
  }

  checkPasswordConf(){
    let inputPasswordConf = document.getElementById('passwordConf');
    if(this.passwordConf==''){
      this.invalidPasswordConf = true;
      inputPasswordConf?.classList.add("is-invalid");
      this.messagePasswordConf = 'Por favor, rellena la contraseña';
    }else if(this.passwordConf!=this.password){
      this.invalidPasswordConf = true;
      inputPasswordConf?.classList.add("is-invalid");
      this.messagePasswordConf = 'Las contraseñas no coinciden';
    }else{
      this.invalidPasswordConf = false;
      inputPasswordConf?.classList.remove("is-invalid");
    }
  }

  limpiarChecks(){
    this.invalidLogin = false;
    this.invalidSignup = false;
    this.invalidUser = false;
    this.invalidEmail = false;
    this.invalidPassword = false;
    this.invalidPasswordConf = false;
    let inputUser = document.getElementById('username');
    inputUser?.classList.remove("is-invalid");
    let inputEmail = document.getElementById('email');
    inputEmail?.classList.remove("is-invalid");
    let inputPassword = document.getElementById('password');
    inputPassword?.classList.remove("is-invalid");
    let inputPasswordConf = document.getElementById('passwordConf');
    inputPasswordConf?.classList.remove("is-invalid");
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }

  sumarProducto(producto:any){
    this.carritoService.anadirProducto(producto);
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
  }

  restarProducto(producto:any){
    this.carritoService.quitarProducto(producto);
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
  }

  procesarPedido(){
    this.router.navigate(['/pedido'])
  }
}
