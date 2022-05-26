import { Component, OnInit } from '@angular/core';
import { Producto, Productos, AccesorioTipos, } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.scss']
})
export class AccesoriosComponent implements OnInit {

  accesorios: Productos = [];
  accesoriosFiltrados: Productos = [];
  accesorioTipos: AccesorioTipos = [];

  tipoId: any = null;
  nombre: string = "";
   
  filtrado: boolean = false;

  selectedAccesorio: Producto = {
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

  constructor(
    private productosService:ProductosService,
    private carritoService:CarritoService
    ) {  }

  ngOnInit(): void {
    this.getAccesorios().then((value)=> {
      this.accesoriosFiltrados = this.accesorios,
      this.selectedAccesorio! = this.accesorios[0];
    });
    this.getAccesorioTipos();
  }

  getAccesorios(){
    return new Promise((resolve, reject) => {
      this.productosService.getAccesorios().subscribe(
        (res: Productos) => {
          this.accesorios = res;
          this.accesorios.forEach((accesorio)=>{
            if(accesorio.price_dec=="0"){
              accesorio.price_dec= "00";
            }
          })
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  getAccesorioTipos(){
    return new Promise((resolve, reject) => {
      this.productosService.getAccesorioTipos().subscribe(
        (res: AccesorioTipos) => {
          this.accesorioTipos = res;
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  filtrar(){
    this.filtrado = true;
    this.accesoriosFiltrados = [];
    this.accesorios.forEach((accesorio) => {
      if(this.tipoId==="" && this.nombre===""){
        this.filtrado = false;
      }else{
        if((this.tipoId==="" && accesorio.name.toLowerCase().trim().includes(this.nombre.toLowerCase().trim())) || 
           (accesorio.accesorio_tipo.id===this.tipoId && this.nombre==="") || 
           (accesorio.accesorio_tipo.id===this.tipoId && accesorio.name.toLowerCase().trim().includes(this.nombre.toLowerCase().trim()))){
          
            this.accesoriosFiltrados.push(accesorio);
        }
      }
    })

    if(!this.filtrado){
      this.accesoriosFiltrados = this.accesorios
    }
  }

  limpiarFiltros(){
    this.tipoId="";
    this.nombre="";
  }

  selectAccesorio(accesorio:any){
    this.selectedAccesorio = accesorio;
  }

  anadirACarrito(){
    this.carritoService.anadirProducto(this.selectedAccesorio);
    window.location.reload();
  }
}
