import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-listar-producto',
  standalone: false,
  templateUrl: './listar-producto.html',
  styleUrl: './listar-producto.css',
})
export class ListarProducto implements OnInit{

  productos: Producto[] = [];

  productoEditando: string | null = null;
  nombreEditado = '';
  descripcionEditada = '';
  precioEditado = 0;
  stockEditado = 0;


  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.ObtenerProductos().subscribe(data => {
      this.productos = data;
      this.cdr.detectChanges();
    });
  }

  guardarEdicion(producto: Producto) {
    this.productoService.actualizarProducto(producto.id!, {
      nombre: this.nombreEditado,
      descripcion: this.descripcionEditada,
      precio: this.precioEditado,
      stock: this.stockEditado,
    }).then(() => {
      console.log('Producto actualizado');
    });
    this.productoEditando = null;
    this.cdr.detectChanges();
  }

  eliminarProducto(id?: string) {
    if (!id) return;

    if (confirm("estas seguro que quieres eliminar este producto")) {
      this.productoService.eliminarProducto(id);
    }
  }

  editarProducto(producto : Producto) {
    this.productoEditando = producto.id!;
    this.nombreEditado = producto.nombre;
    this.descripcionEditada = producto.descripcion;
    this.precioEditado = producto.precio;
    this.stockEditado = producto.stock;
    this.cdr.detectChanges();
  }

  cancelarEdicion() {
    this.productoEditando = null;
    this.cdr.detectChanges();
  }


}
