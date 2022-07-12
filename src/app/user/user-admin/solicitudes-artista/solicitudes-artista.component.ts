import { Component, OnInit } from '@angular/core';
import { User, Users } from 'src/app/models/interfaces';
import { ArtistasService } from 'src/app/services/artistas.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-solicitudes-artista',
  templateUrl: './solicitudes-artista.component.html',
  styleUrls: ['./solicitudes-artista.component.scss']
})
export class SolicitudesArtistaComponent implements OnInit {
  
  solicitudes? : any = [];

  selectedSolicitud? : {
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

  constructor(private loginService : LoginService, private artistasService : ArtistasService) { }

  ngOnInit(): void {
    this.getSolicitudes()
    this.selectedSolicitud = this.solicitudes[0];
  }

  getSolicitudes(){
    return new Promise(resolve=>{
      this.artistasService.getSolicitudes().subscribe((res)=>{
        res.data.forEach((response:any)=>{
          this.loginService.getUser(response.attributes.user.data.id).subscribe((user)=>{
            if(user.avatar?.name == null){
              user.avatar!.url = "../../assets/images/avatar.svg";
              user.avatar!.name = "Avatar.svg"
            }
            this.solicitudes?.push(user)
            this.solicitudes?.length == res.data.length ? resolve : {}
          })
        })
      })
    }) 
  }
  
  formatDate(date: Date){
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
  }
  
  selectSolicitud(solicitud:any){
    this.selectedSolicitud = solicitud;
    console.log("🚀 ~ file: solicitudes-artista.component.ts ~ line 41 ~ SolicitudesArtistaComponent ~ selectSolicitud ~ this.selectedSolicitud", this.selectedSolicitud)
  }

  aprobarSolicitud(selectedSolicitud:any){
    
  }

  rechazarSolicitud(selectedSolicitud:any){

  }

}
