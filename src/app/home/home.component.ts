import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito, Producto, Productos, User } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { LoginService } from '../services/login.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  figuras:Productos = [];
  pinturas:Productos = [];
  accesorios:Productos = [];

  selectedProducto: Producto = {
    id: 0,
    name: "",
    price_int: 0,
    price_dec: "",
    description: "",
    image: {
        name: "",
        url: "../../assets/images/avatar.svg",
    },
    accesorio_tipo: {
      id: 0,
      name: "",
    },
    figura_tipo: {
      id: 0,
      name: "",
    },
    pintura_tipo: {
      id: 0,
      name: "",
    },
    producto_tipo: {
      id: 1,
      name: "Accesorio",
    }
  };

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

  total: number = 0;

  constructor(
    private router:Router, 
    private productosService:ProductosService,
    private carritoService : CarritoService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    
    this.productosService.getFiguras().subscribe((res)=>{
      if(res.length>3){
        this.figuras = res.slice(res.length-3);
      }else{
        this.figuras = res;
      }
    })
    this.productosService.getPinturas().subscribe((res)=>{
      if(res.length>3){
        this.pinturas = res.slice(res.length-3);
      }else{
        this.pinturas = res;
      }
    })
    this.productosService.getAccesorios().subscribe((res)=>{
      if(res.length>3){
        this.accesorios = res.slice(res.length-3);
      }else{
        this.accesorios = res;
      }
    })

    if(this.user){
      if(this.user.avatar?.name == null){
        this.user.avatar!.url = "../../assets/images/avatar.svg";
        this.user.avatar!.name = "Avatar.svg"
      }
    }
    this.carrito = this.carritoService.carritoValue;
    this.total = this.carritoService.totalCarrito;
    
  }

  selectProducto(producto:any){
    this.selectedProducto = producto;
  }

  anadirACarrito(){
    this.carritoService.anadirProducto(this.selectedProducto);
    window.location.reload();
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
    // const form = document.querySelector('form');
    // let image:any;
    // form!.addEventListener('submit', async (e:any) => {
    //   e.preventDefault();
    //   await fetch('http://localhost:1337/api/upload', {
    //     method: 'post',
    //     body: new FormData(e.target)
    //   }).then(()=>{
    //     this.loginService.getUploads().subscribe((res)=>{
    //       console.log(res.item.pop());
    //       image = res.item.pop();
    //     })
    //   })
    //   this.loginService.signUp(image).then(res=>console.log(res));
    // });
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

  procesarPedido(carrito:Carrito){
    this.router.navigate(['/artistas/productos-artista']);
  }

  
}
