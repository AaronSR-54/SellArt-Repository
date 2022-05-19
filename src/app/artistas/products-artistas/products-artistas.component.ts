import { Component, Input, OnInit } from '@angular/core';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { ArtistasService } from 'src/app/services/artistas.service';
import { FigurasService } from 'src/app/services/figuras.service';
import { PinturasService } from 'src/app/services/pinturas.service';

@Component({
  selector: 'app-products-artistas',
  templateUrl: './products-artistas.component.html',
  styleUrls: ['./products-artistas.component.scss']
})
export class ProductsArtistasComponent implements OnInit {

  productos: any = [];

  selectedProducto!: any

  constructor(private artistasService : ArtistasService,
    private accesoriosService : AccesoriosService,
    private figurasService : FigurasService,
    private pinturasService : PinturasService,
    ) { 
  }

  ngOnInit(): void {
    // this.getProductos();
    // this.selectedProducto = this.productos[0];
    console.log("Artista:", this.artistasService.artista)
  }

  // getProductos(){
  //   this.accesoriosService.getAccesorios().subscribe
  // }

  // selectProducto(producto:any){
  //   this.selectedProducto = producto;
  // }
}