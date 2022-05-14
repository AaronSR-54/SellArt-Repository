import { Component, OnInit } from '@angular/core';
import { Accesorios } from '../models/interfaces';
import { AccesoriosService } from '../services/accesorios.service';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.scss']
})
export class AccesoriosComponent implements OnInit {

  accesorios: Accesorios = [];

  constructor(private accesoriosService : AccesoriosService) { }

  ngOnInit(): void {
    this.getAccesorios();
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
}
