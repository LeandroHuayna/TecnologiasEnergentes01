
import { Auth } from './../../../services/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registrar',
  standalone: false,
  templateUrl: './registrar.html',
  styleUrl: './registrar.css',
})
export class Registrar {
  email: string = '';
  password: string = '';
  constructor(private authService: Auth) {}
  registrar() {
    this.authService
    .registrar(this.email, this.password)
    .then((user) => {
      console.log('Registro exitoso', user.user?.email);
    })
    .catch((error) => {
      console.error('Error en registro', error);
    });
  }
}
