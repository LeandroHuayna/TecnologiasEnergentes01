import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(
    private afAuth: AngularFireAuth, 
    private usuarioService: Usuario           // cambiamos una variable : Usuario ===> usuarioService
  ) {}

  async registrar(email: string, password: string) {

      const cred = await this.afAuth.createUserWithEmailAndPassword(
      
      email, 
      password
    );
    const uid = cred.user?.uid || '';

    await this.usuarioService.crearUsuario(uid, email); //puede pasar algo "iud"
    return cred;
  }
  
  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);   //libreria de verificacion y retorna a then.
  }
  logout  () {
    return this.afAuth.signOut();
  }

  ObtenerUsuario (uid: string) {
    return this.usuarioService.obtenerUsuario(uid);       // modificado
  }
}
