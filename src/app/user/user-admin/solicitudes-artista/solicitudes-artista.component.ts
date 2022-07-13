import { Component, OnInit } from '@angular/core';
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
    id: 0.
    user:{
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
          let solicitud = {
            id: response.id,
            user: {}
          }
          this.loginService.getUser(response.attributes.user.data.id).subscribe((user)=>{
            if(user.avatar?.name == null){
              user.avatar!.url = "../../assets/images/avatar.svg";
              user.avatar!.name = "Avatar.svg"
            }
            solicitud.user = user;
            this.solicitudes?.push(solicitud)
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
  }

  aprobarSolicitud(selectedSolicitud:any){
    let requestUser = {
      role : 3
    }
    
    this.loginService.editUser(requestUser, selectedSolicitud.user.id).subscribe(()=>{
      this.artistasService.removeSolicitud(selectedSolicitud.id).subscribe(()=>{
        this.solicitudes.length = 0;
        this.getSolicitudes()
      })
    })
  }

  rechazarSolicitud(selectedSolicitud:any){
    this.artistasService.removeSolicitud(selectedSolicitud.id).subscribe(()=>{
      this.solicitudes.length = 0;
      this.getSolicitudes()
    })
  }

}
