import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FigurasComponent,
    AccesoriosComponent,
    PinturasComponent,
    HomeComponent,
    ArtistasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
