import { Component, OnInit } from '@angular/core';
import { Pintura, Pinturas, PinturaTipos } from '../models/interfaces';
import { PinturasService } from '../services/pinturas.service';

@Component({
  selector: 'app-pinturas',
  templateUrl: './pinturas.component.html',
  styleUrls: ['./pinturas.component.scss']
})
export class PinturasComponent implements OnInit {

  pinturas : Pinturas = [];
  pinturasFiltradas: Pinturas = [];
  pinturaTipos: PinturaTipos = [];

  tipoId: any = null;
  nombre: string = "";
   
  filtrado: boolean = false;

  selectedPintura: Pintura = {
    id: 0,
    name: "",
    price_int: 0,
    price_dec: "",
    description: "",
    image: {
        name: "",
        url: "../../assets/images/avatar.svg",
    },
    pintura_tipo: {
        id: 0,
        name: "",
    }
  };

  constructor(private pinturasService : PinturasService) { }

  ngOnInit(): void {
    this.getPinturas().then((value)=> {
      this.pinturasFiltradas = this.pinturas,
      this.selectedPintura = this.pinturas[0];
    });
    this.getPinturaTipos();
  }

  getPinturas(){
    return new Promise((resolve, reject) => {
      this.pinturasService.getPinturas().subscribe(
        (res: Pinturas) => {
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
      this.pinturasService.getPinturaTipos().subscribe(
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
}
