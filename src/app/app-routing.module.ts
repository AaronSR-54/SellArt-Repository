import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistasComponent } from './artistas/artistas.component';
import { FigurasComponent } from './figuras/figuras.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { HomeComponent } from './home/home.component';
import { PinturasComponent } from './pinturas/pinturas.component';
import { ProductsArtistasComponent } from './artistas/products-artistas/products-artistas.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  { path: 'artistas', component: ArtistasComponent },
  { path: 'figuras', component: FigurasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'pinturas', component: PinturasComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artistas/productos-artista', component: ProductsArtistasComponent},
  { path: 'procesar-pedido', component: PedidoComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
