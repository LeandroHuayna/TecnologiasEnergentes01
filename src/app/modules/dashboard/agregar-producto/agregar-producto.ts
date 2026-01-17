import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css',
})
export class AgregarProducto implements OnInit {

  categorias: Categoria[] = [];

  producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoriaId: '',
    categoriaNombre: '',
    creadoEn: new Date()
  };
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.categoriaService.ObtenerCategorias().subscribe(data => {
      this.categorias = data.filter(c => c.activo);
    });
  }

  guardarProducto() {
    debugger;
    const categoria = this.categorias.find(
      c => c.id === this.producto.categoriaId
    );

    if (!categoria) return;

    this.producto.categoriaNombre = categoria.nombre;

    this.productoService.agregarProducto(this.producto).then(() => {
      console.log('Producto guardado');
      this.resetForm();
    })
  }

  resetForm() {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      categoriaId: '',
      categoriaNombre: '',
      creadoEn: new Date()
    };
  }
}
