
import { Injectable, runInInjectionContext, Injector, Provider } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(
    private firestore : AngularFirestore,
    private injector : Injector
  ) {}
  ObtenerCategorias() {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
      .collection<Categoria>('categorias')
      .valueChanges({ idField : 'id'});
    });
  }
  agregarCategoria(categoria: Categoria) {
    const id = this.firestore.createId();
    return runInInjectionContext(this.injector, () => {
      return this.firestore
      .collection('categorias')
      .doc(id)
      .set({
        ...categoria,
        activo: true,
        creadoEn: new Date(),
      })
    })
  }

  eliminarCategoria(id: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('categorias').doc(id).delete();
    });
  }

  actualizarCategoria(id: string, data: Partial<Categoria>) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
      .collection('categorias')
      .doc(id)
      .update(data);
    });
  }

}


