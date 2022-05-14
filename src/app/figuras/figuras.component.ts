import { Component, OnInit } from '@angular/core';
import { Figuras } from '../models/interfaces';
import { FigurasService } from '../services/figuras.service';

@Component({
  selector: 'app-figuras',
  templateUrl: './figuras.component.html',
  styleUrls: ['./figuras.component.scss']
})
export class FigurasComponent implements OnInit {

  figuras: Figuras = [];

  constructor(private figurasService : FigurasService) { }

  ngOnInit(): void {
    this.getFiguras().then();
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

}
