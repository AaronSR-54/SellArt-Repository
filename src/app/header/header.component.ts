import { Component, OnInit } from '@angular/core';
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
  password: string = '';
  
  fileForm: FormGroup;  

  messageUser: string = 'Por favor, rellena el usuario';
  messagePassword: string = 'Por favor, rellena la contraseña';
  messageLogin: string = 'Usuario y/o contraseña incorrectos';

  invalidLogin: boolean = false;
  invalidUser: boolean = false;
  invalidPassword: boolean = false;

  user: User = this.loginService.currentUserValue;
  carrito: Carrito = this.carritoService.carritoValue;

  total: number = 0;

  constructor(
    private loginService: LoginService, 
    private carritoService : CarritoService,
    private router : Router,
    private formBuilder: FormBuilder) { 
      this.fileForm = this.formBuilder.group({
        profile: [""]
      });
    }

    
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
  
  // QUEDA POR HACER
  
    signup(){
    //   console.log("patata")
      
    //   const form = document.querySelector('form');
    //   console.log("🚀 ~ file: header.component.ts ~ line 90 ~ HeaderComponent ~ signup ~ form", form)
    //   form?.addEventListener('submit', async (e) => {
    //     e.preventDefault();
    //     console.log("🚀 ~ file: header.component.ts ~ line 93 ~ HeaderComponent ~ form?.addEventListener ~ e", e)
    //     this.loginService.uploadImage(e.target).subscribe(res=>{
    //     console.log("🚀 ~ file: header.component.ts ~ line 92 ~ HeaderComponent ~ this.loginService.uploadImage ~ res", res)
          
    //     })
    //   });
      
    //   // this.loginService.uploadImage(this.file!).subscribe(res=>{
    //   //   console.log("🚀 ~ file: header.component.ts ~ line 91 ~ HeaderComponent ~ this.loginService.uploadImage ~ res", res)
    //   // })
    }

  // QUEDA POR HACER

    onSubmit(){
    //   const formData = new FormData();
    //   formData.append('file', this.fileForm.get('profile')!.value);
                  
    //   this.loginService.uploadImage(formData).subscribe(
    //     (res) => console.log(res),
    //     (err) => console.log(err)
    //   );
    }

    onFileSelect(event:any) {
    //   if (event.target.files.length > 0) {
    //     const file = event.target.files[0];
    //     this.fileForm.get('profile')!.setValue(file);
    //   }
    }

  logout(){
    this.loginService.logout();
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
    this.router.navigate(['/pedido']);
  }
}
