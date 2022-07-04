import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-completado',
  templateUrl: './pedido-completado.component.html',
  styleUrls: ['./pedido-completado.component.scss']
})
export class PedidoCompletadoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigate(['/']);
  }
}
