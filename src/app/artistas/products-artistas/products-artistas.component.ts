import { Component, Input, OnInit } from '@angular/core';
import { Producto, Productos, User } from 'src/app/models/interfaces';
import { ArtistasService } from 'src/app/services/artistas.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-products-artistas',
  templateUrl: './products-artistas.component.html',
  styleUrls: ['./products-artistas.component.scss']
})
export class ProductsArtistasComponent implements OnInit {
  
  artista: User = this.artistasService.artistaValue;

  productosId: any = [];

  productosArtista: Productos = [];

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

  productosFiltrados: Productos = [];

  filtrado: boolean = false;

  constructor(
    private artistasService : ArtistasService,
    private productosService : ProductosService,
    private carritoService : CarritoService
  ) {  }
  

  ngOnInit(): void {
    this.artista = this.artistasService.artistaValue;
    this.getProductosArtista();
    this.productosFiltrados = this.productosArtista;
  }

  getProductosArtista(){
    this.artista.productos.forEach((producto:any)=>this.productosId.push(producto.id));
    this.productosId.forEach((id: number)=>{
    this.productosService.getAllProductos().subscribe(
      (res: Productos) => {
        res.forEach((producto)=>{
          if(producto.id === id){
            this.productosArtista.push(producto);
          }
        })
      }
    )
   })
  }

  selectProducto(producto:any){
    this.selectedProducto = producto;
  }

  anadirACarrito(){
    this.carritoService.anadirProducto(this.selectedProducto);
    window.location.reload();
  }
}