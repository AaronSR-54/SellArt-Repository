import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artista-solicitado',
  templateUrl: './artista-solicitado.component.html',
  styleUrls: ['./artista-solicitado.component.scss']
})
export class ArtistaSolicitadoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigate(['/']);
  }
}
