import { Component, OnInit } from '@angular/core';
import { Pinturas } from '../models/interfaces';
import { PinturasService } from '../services/pinturas.service';

@Component({
  selector: 'app-pinturas',
  templateUrl: './pinturas.component.html',
  styleUrls: ['./pinturas.component.scss']
})
export class PinturasComponent implements OnInit {

  pinturas : Pinturas = [];

  constructor(private pinturasService : PinturasService) { }

  ngOnInit(): void {
    this.getPinturas();
  }

  getPinturas(){
    return new Promise((resolve, reject) => {
      this.pinturasService.getPinturas().subscribe(
        (res: Pinturas) => {
          console.log(res);
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
}
