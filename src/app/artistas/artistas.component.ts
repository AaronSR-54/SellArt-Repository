import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Users } from '../models/interfaces';
import { ArtistasService } from '../services/artistas.service';

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
    accesorios: [],
    pinturas: [],
    figuras: [],
  };

  constructor(private artistasService : ArtistasService, private router: Router) { }

  ngOnInit(): void {
    this.getArtistas().then((value)=> {
      this.selectedArtista = this.artistas[0];
      console.log("Artistas: ", this.artistas)
    });
  }

  getArtistas(){
    return new Promise((resolve, reject) => {
      this.artistasService.getArtistas().subscribe(
        (res: Users) => {
          this.artistas = res;
          this.artistas.forEach((artista)=>{
            if(artista.avatar.name == null || artista.avatar.name == null){
              artista.avatar.url = "../../assets/images/avatar.svg";
              artista.avatar.name = "Avatar.svg"
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
    this.artistasService.artista = this.selectedArtista;
    this.router.navigate(['/artistas/productos-artista']);
  }
}
