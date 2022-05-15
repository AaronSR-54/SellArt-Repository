import { Component, OnInit } from '@angular/core';
import { Figuras, FiguraTipos } from '../models/interfaces';
import { FigurasService } from '../services/figuras.service';

@Component({
  selector: 'app-figuras',
  templateUrl: './figuras.component.html',
  styleUrls: ['./figuras.component.scss']
})
export class FigurasComponent implements OnInit {

  figuras: Figuras = [];
  figurasFiltradas: Figuras = [];
  figuraTipos: FiguraTipos = [];

  tipoId: any = null;
  nombre: string = "";
   
  filtrado: boolean = false;

  constructor(private figurasService : FigurasService) { }

  ngOnInit(): void {
    this.getFiguras().then((value)=> this.figurasFiltradas=this.figuras);
    this.getFiguraTipos();
  }

  getFiguras(){
    return new Promise((resolve, reject) => {
      this.figurasService.getFiguras().subscribe(
        (res: Figuras) => {
          console.log(res);
          this.figuras = res;
          this.figuras.forEach((figura)=>{
            if(figura.price_dec=="0"){
              figura.price_dec= "00";
            }
          })
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  getFiguraTipos(){
    return new Promise((resolve, reject) => {
      this.figurasService.getFiguraTipos().subscribe(
        (res: FiguraTipos) => {
          console.log(res);
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

}
