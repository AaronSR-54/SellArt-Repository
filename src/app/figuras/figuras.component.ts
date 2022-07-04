import { Component, OnInit } from '@angular/core';
import { FiguraTipos, Producto, Productos } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-figuras',
  templateUrl: './figuras.component.html',
  styleUrls: ['./figuras.component.scss']
})
export class FigurasComponent implements OnInit {

  figuras: Productos = [];
  figurasFiltradas: Productos = [];
  figuraTipos: FiguraTipos = [];

  tipoId: any = null;
  nombre: string = "";
   
  filtrado: boolean = false;
  
  selectedFigura: Producto = {
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
      id: 2,
      name: "Figura",
    }
  };

  gettingFiguras = false;

  constructor(
    private productosService:ProductosService,
    private carritoService:CarritoService
    ) {  }

  ngOnInit(): void {
    this.getFiguras().then((value)=> {
      this.figurasFiltradas = this.figuras,
      this.selectedFigura = this.figuras[0];
    });
    this.getFiguraTipos();
  }

  getFiguras(){
    this.gettingFiguras=true;
    return new Promise((resolve, reject) => {
      this.productosService.getFiguras().subscribe(
        (res: Productos) => {
          this.figuras = res;
          this.figuras.forEach((figura)=>{
            if(figura.price_dec=="0"){
              figura.price_dec= "00";
            }
          })
          resolve("resolved");
          this.gettingFiguras=false;
        },
        (error) => reject(error)
      )
    })
  }

  getFiguraTipos(){
    return new Promise((resolve, reject) => {
      this.productosService.getFiguraTipos().subscribe(
        (res: FiguraTipos) => {
          this.figuraTipos = res;
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  filtrar(){
    this.filtrado = true;
    this.figurasFiltradas = [];
    this.figuras.forEach((figura) => {
      if(this.tipoId==="" && this.nombre===""){
        this.filtrado = false;
      }else{
        if((this.tipoId==="" && figura.name.toLowerCase().trim().includes(this.nombre.toLowerCase().trim())) || 
           (figura.figura_tipo.id===this.tipoId && this.nombre==="") || 
           (figura.figura_tipo.id===this.tipoId && figura.name.toLowerCase().trim().includes(this.nombre.toLowerCase().trim()))){
          
            this.figurasFiltradas.push(figura);
        }
      }
    })

    if(!this.filtrado){
      this.figurasFiltradas = this.figuras
    }
  }

  limpiarFiltros(){
    this.tipoId="";
    this.nombre="";
  }

  selectFigura(figura:any){
    this.selectedFigura = figura;
  }

  anadirACarrito(){
    this.carritoService.anadirProducto(this.selectedFigura);
    window.location.reload();
  }
}
