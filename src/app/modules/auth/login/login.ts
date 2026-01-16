import { Auth } from './../../../services/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Usuario } from '../../../services/usuario';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private authService: Auth, private Router: Router) {}

  login() {
    this.authService
      .login(this.email, this.password)
      .then((cred) => {                           //resiva la verificacion de login del servicio auth
        const uid = cred.user?.uid || '';               //muestra la uid
        debugger;
        this.authService.ObtenerUsuario(uid).subscribe((usuario:any) => {
          debugger;
          console.log('Usuario', usuario);
          if(usuario.rol === "admin") {               //busqueda de rol, muy importante
            this.Router.navigate(['/admin']);
          }else{
            this.Router.navigate(['/usuario']);
          }
        })

        //console.log('login exitoso');
        //console.log('el identificador es ' + uid);
        //this.Router.navigate(["/admin"]);

      })
      .catch((error) => {
        console.error('error en login: ', error);
      });
  }
  irRegistrar() {
    this.Router.navigate(["/registrar"]);   
  }
}
