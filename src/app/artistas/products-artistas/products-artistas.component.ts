import { Component, Input, OnInit } from '@angular/core';
import { Producto, Productos, User } from 'src/app/models/interfaces';
import { ArtistasService } from 'src/app/services/artistas.service';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-products-artistas',
  templateUrl: './products-artistas.component.html',
  styleUrls: ['./products-artistas.component.scss']
})
export class ProductsArtistasComponent implements OnInit {

  artista: User | null = null;

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
  productosFiltrados: Productos = [];

  filtrado: boolean = false;

  constructor(
    private artistasService : ArtistasService,
    private productosService : ProductosService
    ) { 
  }

  ngOnInit(): void {
    this.artista = this.artistasService.artista;
    this.productosFiltrados = this.productosService.productosArtista;
    console.log("Artista:", this.artista);
    console.log("Productos: ", this.productosFiltrados);
  }
  
  selectProducto(producto:any){
    this.selectedProducto = producto;
  }
}