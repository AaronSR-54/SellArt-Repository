import { Component, OnInit } from '@angular/core';
import { Producto, Productos, User } from 'src/app/models/interfaces';
import { LoginService } from 'src/app/services/login.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-user-artista',
  templateUrl: './user-artista.component.html',
  styleUrls: ['./user-artista.component.scss']
})
export class UserArtistaComponent implements OnInit {

  user : User = this.loginService.currentUserValue;

  productos: Productos = [];
  productosId: any = [];

  selectedProducto: Producto = {
    id: 0,
    name: "",
    price_int: 0,
    price_dec: "",
    description: "",
    image: {
        id: 0,
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

  constructor(
    private productosService:ProductosService,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
    this.getProductosArtista();
  }

  getProductosArtista(){
    this.user.productos.forEach((producto:any)=>this.productosId.push(producto.id));
    this.productosId.forEach((id: number)=>{
    this.productosService.getAllProductos().subscribe(
      (res: Productos) => {
        res.forEach((producto)=>{
          if(producto.id === id){
            this.productos.push(producto);
          }
        })
      }
    )
   })
  }

  selectProducto(producto:any){
    this.selectedProducto = producto;
  }

}
