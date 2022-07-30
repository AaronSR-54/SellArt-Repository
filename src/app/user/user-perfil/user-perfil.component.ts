import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss']
})
export class UserPerfilComponent implements OnInit {
  
  user = this.loginService.currentUserValue;

  userEdit = {
    username:  this.user.username,
    email:  this.user.email,
    biography: this.user.biography,
    avatar: {
      name: this.user.avatar!.name,
      url: this.user.avatar!.url
    },
    password:  '',
    passwordConf:  '',
  }

  messageUser: string = 'Por favor, rellena el usuario';
  messageEmail: string = 'Por favor, rellena el email';
  messagePassword: string = 'Por favor, rellena la contraseña';
  messagePasswordConf: string = 'Por favor, rellena la contraseña';
  messageLogin: string = 'Usuario y/o contraseña incorrectos';

  invalidLogin: boolean = false;
  invalidSignup: boolean = false;
  invalidUser: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  invalidPasswordConf: boolean = false;

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  checkUsername(){
    let inputUser = document.getElementById('username');
    if(this.userEdit.username==''){
      this.invalidUser = true;
      inputUser?.classList.add("is-invalid");
      this.messageUser = 'Por favor, rellena el usuario';
    }else{
      this.invalidUser = false;
      inputUser?.classList.remove("is-invalid");
    }
  }

  checkPassword(){
    let inputPassword = document.getElementById('password');
    if(this.userEdit.password!='' && this.userEdit.password.length<8){
      this.invalidPassword = true;
      inputPassword?.classList.add("is-invalid");
      this.messagePassword = 'Le faltan carácteres a la contraseña';
    }else{
      this.invalidPassword = false;
      inputPassword?.classList.remove("is-invalid");
    }
  }

  checkPasswordConf(){
    let inputPasswordConf = document.getElementById('passwordConf');
    if(this.userEdit.passwordConf!=this.userEdit.password){
      this.invalidPasswordConf = true;
      inputPasswordConf?.classList.add("is-invalid");
      this.messagePasswordConf = 'Las contraseñas no coinciden';
    }else{
      this.invalidPasswordConf = false;
      inputPasswordConf?.classList.remove("is-invalid");
    }
  }

  limpiarChecks(){
    this.userEdit = {
      username:  this.user.username,
      email:  this.user.email,
      biography: this.user.biography,
      avatar: {
        name: this.user.avatar!.name,
        url: this.user.avatar!.url
      },
      password:  '',
      passwordConf:  '',
    }
    this.invalidUser = false;
    this.invalidPassword = false;
    this.invalidPasswordConf = false;
    let inputUser = document.getElementById('username');
    inputUser?.classList.remove("is-invalid");
    let inputPassword = document.getElementById('password');
    inputPassword?.classList.remove("is-invalid");
    let inputPasswordConf = document.getElementById('passwordConf');
    inputPasswordConf?.classList.remove("is-invalid");
  }

  editUser(){
    this.checkUsername()
    this.checkPassword()
    this.checkPasswordConf()

    let editUserRequest;
    if(!this.invalidUser && !this.invalidEmail && !this.invalidPassword && !this.invalidPasswordConf){
      if (this.userEdit.password!=''){
        editUserRequest = {
            username: this.userEdit.username,
            biography: this.userEdit.biography,
            password: this.userEdit.password
        }
      }else{
        editUserRequest = {
          username: this.userEdit.username,
          biography: this.userEdit.biography
        }
      }

      this.loginService.editUser(editUserRequest, this.user.id).subscribe((res:any)=>{
        console.log(res)
        this.user.username = res.username,
        this.user.biography = res.biography

        this.loginService.setCurrentUser(this.user).then(()=>{
          this.router.navigate(['/']);
        })
      });
    }
  }

}
