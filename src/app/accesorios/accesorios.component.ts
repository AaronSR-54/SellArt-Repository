import { Component, OnInit } from '@angular/core';
import { Accesorio, Accesorios, AccesorioTipos } from '../models/interfaces';
import { AccesoriosService } from '../services/accesorios.service';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.scss']
})
export class AccesoriosComponent implements OnInit {

  accesorios: Accesorios = [];
  accesoriosFiltrados: Accesorios = [];
  accesorioTipos: AccesorioTipos = [];

  tipoId: any = null;
  nombre: string = "";
   
  filtrado: boolean = false;

  selectedAccesorio!: Accesorio;

  constructor(private accesoriosService : AccesoriosService) { }

  ngOnInit(): void {
    this.getAccesorios().then((value)=> {
      this.accesoriosFiltrados = this.accesorios,
      this.selectedAccesorio = this.accesorios[0];
    });
    this.getAccesorioTipos();
  }

  getAccesorios(){
    return new Promise((resolve, reject) => {
      this.accesoriosService.getAccesorios().subscribe(
        (res: Accesorios) => {
          console.log(res);
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
      this.accesoriosService.getAccesorioTipos().subscribe(
        (res: AccesorioTipos) => {
          console.log(res);
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
    console.log(this.selectedAccesorio);
  }
}
