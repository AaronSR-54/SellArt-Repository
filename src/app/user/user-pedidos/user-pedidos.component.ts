import { Component, OnInit } from '@angular/core';
import { Pedido, Pedidos, User } from 'src/app/models/interfaces';
import { LoginService } from 'src/app/services/login.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-user-pedidos',
  templateUrl: './user-pedidos.component.html',
  styleUrls: ['./user-pedidos.component.scss']
})
export class UserPedidosComponent implements OnInit {

  user : User = this.loginService.currentUserValue

  pedidos? : Pedidos;

  selectedPedido? : Pedido;

  constructor(
    private pedidosService : PedidoService,
    private loginService : LoginService
    ) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos(){
    this.pedidosService.getUserPedidos(this.user.id).subscribe(res=>{
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
    console.log("🚀 ~ file: user-pedidos.component.ts ~ line 54 ~ UserPedidosComponent ~ this.selectedPedido", this.selectedPedido)
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
