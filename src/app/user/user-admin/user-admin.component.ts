import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  
  previousActive : string = "";

  constructor() { }

  ngOnInit(): void {
    this.changeActive(1)
  }

  changeActive(number:number){
    let el;
    let prev = document.getElementById(this.previousActive);

    switch(number){
      case 1:
        el = document.getElementById('usuarios');
        this.previousActive = 'usuarios';
        break;
      case 2:
        el = document.getElementById('solicitudes');
        this.previousActive = 'solicitudes';
        break;
      case 3:
        el = document.getElementById('pedidos');
        this.previousActive = 'pedidos';
        break;
    }

    if(el!=prev){
      el?.classList.add('active');
      prev?.classList.remove('active');
    }

  }
}
