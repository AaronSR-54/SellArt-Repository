import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { FigurasComponent } from './figuras/figuras.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { PinturasComponent } from './pinturas/pinturas.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsArtistasComponent } from './artistas/products-artistas/products-artistas.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoCompletadoComponent } from './pedido/pedido-completado/pedido-completado.component';
import { UserPedidosComponent } from './user/user-pedidos/user-pedidos.component';
import { UserArtistaComponent } from './user/user-artista/user-artista.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { ArtistaSolicitadoComponent } from './user/user-artista/artista-solicitado/artista-solicitado.component';
import { UserAdminComponent } from './user/user-admin/user-admin.component';
import { SolicitudesArtistaComponent } from './user/user-admin/solicitudes-artista/solicitudes-artista.component';
import { PedidosAdminComponent } from './user/user-admin/pedidos/pedidos.component';
import { UsuariosAdminComponent } from './user/user-admin/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FigurasComponent,
    AccesoriosComponent,
    PinturasComponent,
    HomeComponent,
    ArtistasComponent,
    ProductsArtistasComponent,
    PedidoComponent,
    PedidoCompletadoComponent,
    UserPedidosComponent,
    UserArtistaComponent,
    UserPerfilComponent,
    ArtistaSolicitadoComponent,
    UserAdminComponent,
    SolicitudesArtistaComponent,
    PedidosAdminComponent,
    UsuariosAdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
