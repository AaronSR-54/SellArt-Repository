import { Component, OnInit } from '@angular/core';
import { User } from '../models/interfaces';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  password: string = '';
  messageUser: string = '';
  messagePassword: string = '';
  invalidUser: boolean = false;
  invalidPassword: boolean = false;

  user!: User;
  constructor(private loginService: LoginService) { 
  }

  ngOnInit(): void {
  }

  login(){
    if(!this.invalidUser && !this.invalidPassword){
      this.loginService.login(this.username, this.password);
    }
  }

  usernameChange(){
    let inputUser = document.getElementById('username');
    if(this.username==''){
      this.invalidUser = true;
      this.messageUser = 'Por favor, rellena el usuario';
      inputUser?.classList.add("is-invalid");
    }else{
      this.invalidUser = false;
      inputUser?.classList.remove("is-invalid");
    }
  }

  passwordChange(){
    let inputPassword = document.getElementById('password');
    if(this.password==''){
      this.invalidPassword = true;
      this.messagePassword = 'Por favor, rellena la contraseña';
      inputPassword?.classList.add("is-invalid");
    }else{
      this.invalidPassword = false;
      inputPassword?.classList.remove("is-invalid");
    }
  }

  signup(){

  }
}
