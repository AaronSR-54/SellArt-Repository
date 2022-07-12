import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistasComponent } from './artistas/artistas.component';
import { FigurasComponent } from './figuras/figuras.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { HomeComponent } from './home/home.component';
import { PinturasComponent } from './pinturas/pinturas.component';
import { ProductsArtistasComponent } from './artistas/products-artistas/products-artistas.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoCompletadoComponent } from './pedido/pedido-completado/pedido-completado.component';
import { UserPedidosComponent } from './user/user-pedidos/user-pedidos.component';
import { UserArtistaComponent } from './user/user-artista/user-artista.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { ArtistaSolicitadoComponent } from './user/user-artista/artista-solicitado/artista-solicitado.component';
import { UserAdminComponent } from './user/user-admin/user-admin.component';

const routes: Routes = [
  { path: 'artistas', component: ArtistasComponent },
  { path: 'figuras', component: FigurasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'pinturas', component: PinturasComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artistas/productos-artista', component: ProductsArtistasComponent},
  { path: 'pedido', component: PedidoComponent},
  { path: 'pedido-completado', component: PedidoCompletadoComponent},
  { path: 'user', component: UserPerfilComponent},
  { path: 'user-artista', component: UserArtistaComponent},
  { path: 'artista-solicitado', component: ArtistaSolicitadoComponent},
  { path: 'user-pedidos', component: UserPedidosComponent},
  { path: 'user-admin', component: UserAdminComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
