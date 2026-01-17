import { Producto } from './../models/producto';
import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector
  ) {}

  ObtenerProductos() {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection<Producto>('productos')
        .valueChanges({ idField: 'id' });
    });
  }
  
  agregarProducto(producto: Producto) {
    debugger;
    const id = this.firestore.createId();

    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('productos')
        .doc(id)
        .set({
          ...producto,
          creadoEn: new Date(),
        });
    });
  }

  //listar Producto XD lo mismo que en gestion categoria
  
  eliminarProducto(id: string) {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('productos').doc(id).delete();
  });
  }

  actualizarProducto(id: string, data: Partial<Producto>) {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('productos').doc(id).update(data);
  });
  }
}
