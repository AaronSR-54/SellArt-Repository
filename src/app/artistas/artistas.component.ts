import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, Productos, User, Users } from '../models/interfaces';
import { ArtistasService } from '../services/artistas.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {

  artistas: Users = [];

  nombre: string = "";
   
  filtrado: boolean = false;

  selectedArtista: User = {
    id: 0,
    username: "",
    biography: "",
    email: "",
    avatar: {
        name: "",
        url: "",
    },
    productos: [],
    role: {
      id: 0,
      name: "",
    }
  };

  constructor(private artistasService : ArtistasService, private router: Router, private productosService : ProductosService) { }

  ngOnInit(): void {
    this.getArtistas().then((value)=> {
      this.selectedArtista = this.artistas[0];
    });
  }

  getArtistas(){
    return new Promise((resolve, reject) => {
      this.artistasService.getArtistas().subscribe(
        (res: Users) => {
          this.artistas = res;
          this.artistas.forEach((artista)=>{
            if(artista.avatar?.name == null){
              artista.avatar!.url = "../../assets/images/avatar.svg";
              artista.avatar!.name = "Avatar.svg"
            }
          })
          resolve("resolved");
        },
        (error) => reject(error)
      )
    })
  }

  selectArtista(artista:any){
    this.selectedArtista = artista;
  }

  goToProductosArtista(){
    this.artistasService.setArtista(this.selectedArtista);
    this.router.navigate(['/artistas/productos-artista']);
  }
}
