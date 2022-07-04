import { Component, OnInit } from '@angular/core';
import { PinturaTipos, Producto, Productos } from '../models/interfaces';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-pinturas',
  templateUrl: './pinturas.component.html',
  styleUrls: ['./pinturas.component.scss']
})
export class PinturasComponent implements OnInit {

  pinturas : Productos = [];
  pinturasFiltradas: Productos = [];
  pinturaTipos: PinturaTipos = [];

  tipoId: any = null;
  nombre: string = "";
   
  filtrado: boolean = false;

  selectedPintura: Producto = {
    id: 0,
    name: "",
    price_int: 0,
    price_dec: "",
    description: "",
    image: {
        id:0,
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
      id: 3,
      name: "Pintura",
    }
  };

  constructor(
    private productosService:ProductosService,
    private carritoService:CarritoService
    ) {  }

  ngOnInit(): void {
    this.getPinturas().then((value)=> {
      this.pinturasFiltradas = this.pinturas,
      this.selectedPintura = this.pinturas[0];
    });
    this.getPinturaTipos();
  }

  getPinturas(){
    return new Promise((resolve, reject) => {
      this.productosService.getPinturas().subscribe(
        (res: Productos) => {
          this.pinturas = res
          this.pinturas.forEach((pintura)=>{
            if(pintura.price_dec=="0"){
              pintura.price_dec= "00";
            }
          })
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  getPinturaTipos(){
    return new Promise((resolve, reject) => {
      this.productosService.getPinturaTipos().subscribe(
        (res: PinturaTipos) => {
          this.pinturaTipos = res;
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  filtrar(){
    this.filtrado = true;
    this.pinturasFiltradas = [];
    this.pinturas.forEach((pintura) => {
      if(this.tipoId==="" && this.nombre===""){
        this.filtrado = false;
      }else{
        if((this.tipoId==="" && pintura.name.toLowerCase().trim().includes(this.nombre.toLowerCase().trim())) || 
           (pintura.pintura_tipo.id===this.tipoId && this.nombre==="") || 
           (pintura.pintura_tipo.id===this.tipoId && pintura.name.toLowerCase().trim().includes(this.nombre.toLowerCase().trim()))){
          
            this.pinturasFiltradas.push(pintura);
        }
      }
    })

    if(!this.filtrado){
      this.pinturasFiltradas = this.pinturas
    }
  }

  limpiarFiltros(){
    this.tipoId="";
    this.nombre="";
  }

  selectPintura(pintura:any){
    this.selectedPintura = pintura;
  }

  anadirACarrito(){
    this.carritoService.anadirProducto(this.selectedPintura);
    window.location.reload();
  }
}
