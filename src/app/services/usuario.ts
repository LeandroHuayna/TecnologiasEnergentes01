
import { Injectable, runInInjectionContext, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  
  constructor(
    private firestore:AngularFirestore,
    private injector: Injector,
  ) {}
  
  crearUsuario(uid: string, email: String) {
    return runInInjectionContext(this.injector, () => {
        return this.firestore.collection('Usuarios').doc(uid).set({
        email,
        rol:'usuario',
        fecha_registro: new Date(),
      });
    });
  }
  obtenerUsuario(uid:string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').doc(uid).valueChanges();  
//nombre de la colecion de usuarios XD muy importante
// valueChanges mucho mejor que get, mas dinamico
    })
  }
  ObtenerUsuarios(): Observable<Usuarios[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
      .collection<Usuarios>('Usuarios')
      .snapshotChanges()
      .pipe(
        map((actions) => 
          actions.map((a) => {
            const data = a.payload.doc.data() as Usuarios;
            const uid = a.payload.doc.id;
            return { ...data, uid};
          })
        )
      );
    });
  }
  CambiarRol(uid: string,rol: string): Promise<void> {

    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .update({ rol });
    }).catch((error) => {
      console.error('Error al cambiar rol', error)
    })
  }

  desactivarUsuario(uid: string,activo: boolean): Promise<void> {

    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .update({ activo });
    }).catch((error) => {
      console.error('actualizar estado', error)
    })
  }
}
