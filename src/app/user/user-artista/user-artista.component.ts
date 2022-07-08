import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, Productos, User } from 'src/app/models/interfaces';
import { ArtistasService } from 'src/app/services/artistas.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-user-artista',
  templateUrl: './user-artista.component.html',
  styleUrls: ['./user-artista.component.scss']
})
export class UserArtistaComponent implements OnInit {

  user : any = this.loginService.currentUserValue;

  productos: Productos = [];
  productosId: any = [];

  selectedProducto: Producto = {
    id: 0,
    name: "",
    price_int: 0,
    price_dec: "",
    description: "",
    image: {
        id: 0,
        name: "",
        url: "../../assets/images/avatar.svg",
    },
    accesorio_tipo: {
      id: 0,
      name: "",
    },
    figura_tipo: {
      id: 0,
      name: "",
    },
    pintura_tipo: {
      id: 0,
      name: "",
    },
    producto_tipo: {
      id: 1,
      name: "Accesorio",
    }
  };

  name: string = "";
  description: string = "";
  price: number = 0;

  editingName=false;
  editingBio=false;
  editingPrice=false;
  changed=false;
  solicitado=false;

  constructor(
    private productosService:ProductosService,
    private loginService:LoginService,
    private artistasService:ArtistasService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getProductosArtista();
    this.comprobarSolicitado();
  }

  getProductosArtista(){
    this.user.productos.forEach((producto:any)=>this.productosId.push(producto.id));
    this.productosId.forEach((id: number)=>{
    this.productosService.getAllProductos().subscribe(
      (res: Productos) => {
        res.forEach((producto)=>{
          if(producto.id === id){
            this.productos.push(producto);
          }
        })
      }
    )
   })
  }

  selectProducto(producto:any){
    this.selectedProducto = producto;
    this.name = this.selectedProducto.name;
    this.description = this.selectedProducto.description;
    this.price = this.selectedProducto.price_int + parseInt(this.selectedProducto.price_dec)*0.01;
  }

  changeEditing(editing:string){
    this.changed=true;
    switch(editing) { 
      case "name": { 
         this.editingName = !this.editingName 
         break; 
      } 
      case "bio": { 
         this.editingBio = !this.editingBio 
         break; 
      } 
      case "price": { 
         this.editingPrice = !this.editingPrice 
         break; 
      } 
    } 
  }

  limpiarInputs(){
    this.name = this.selectedProducto.name;
    this.description = this.selectedProducto.description;
    this.price = this.selectedProducto.price_int + parseInt(this.selectedProducto.price_dec)*0.01;
    this.editingName=false;
    this.editingBio=false;
    this.editingPrice=false;
  }

  editarProducto(){
    if(this.name=="" || this.description=="" || this.price==null){   
      this.limpiarInputs();
    }else{
      let productoRequest= {
        data: {
          name : this.name,
          description : this.description,
          price: this.price
        }
      }    
      this.productosService.editarProducto(productoRequest,this.selectedProducto.id).subscribe(()=>window.location.reload())
    }
  }

  solicitarArtista(){
    let solicitudRequest = {
      data: {
        user : this.user.id
      }
    }
    this.artistasService.solicitarArtista(solicitudRequest).subscribe(()=>this.router.navigate(['/artista-solicitado']))
  }

  comprobarSolicitado(){
    this.artistasService.getSolicitudes().subscribe(res=>{
      res.data.forEach((solicitud:any)=>{
        if(solicitud.attributes.user.data.id==this.user.id){
          this.solicitado = true;
        }
      })
    })
  }

}
