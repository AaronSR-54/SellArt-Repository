import { Component, OnInit } from '@angular/core';
import { Pedido, Pedidos, User } from 'src/app/models/interfaces';
import { PedidoService } from 'src/app/services/pedido.service';
import { __classPrivateFieldSet } from 'tslib';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosAdminComponent implements OnInit {

  pedidos? : Pedidos;

  selectedPedido? : Pedido;

  constructor(private pedidosService : PedidoService) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos(){
    this.pedidosService.getPedidos().subscribe(res=>{
      this.pedidos = res;
      this.pedidos?.forEach((pedido:any) => {
        pedido.total = 0;
        pedido.pedidoProductos.forEach((producto:any,index:number)=> {
            this.pedidosService.getPedidoProducto(producto.id).subscribe(res1=>{
              pedido.pedidoProductos[index] = res1;
              pedido.total += (res1.price_int + res1.price_dec*0.01)*res1.cantidad
            })
            pedido.fecha = this.formatDate(pedido.fecha)
          });
      });
    })
  }
  
  formatDate(date: Date){
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
  }
  
  selectPedido(pedido:any){
    this.selectedPedido = pedido;
  }

  cancelarPedido(selectedPedido:any){
    let requestPedido = {
      data: {
        estado:"Cancelado"
      }
    }

    this.pedidosService.updatePedido(selectedPedido.id, requestPedido).subscribe(()=>{
      this.pedidos?.forEach(pedido => pedido.id == selectedPedido.id ? pedido.estado = "Cancelado" : {});
    })
  }

}
