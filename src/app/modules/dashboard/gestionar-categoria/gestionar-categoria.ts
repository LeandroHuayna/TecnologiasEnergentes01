import { Categoria } from './../../../models/categoria';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';



@Component({
  selector: 'app-gestionar-categoria',
  standalone: false,
  templateUrl: './gestionar-categoria.html',
  styleUrl: './gestionar-categoria.css',
})
export class GestionarCategoria implements OnInit{
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = {
    nombre: '',
    descripcion: '',
    activo: true,
    creadoEn: new Date(),
  };
  categoriaEditando: string | null = null;
  nombreEditado: string = '';
  descripcionEditada: string = '';
  constructor (private categoriaService: CategoriaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
/*     debugger; */
    this.categoriaService
    .ObtenerCategorias()
    .subscribe((categorias: Categoria []) => {
      this.categorias = categorias;
      this.cdr.detectChanges();
    });
  }

  guardarCategoria() {
/*     debugger; */
    this.categoriaService.agregarCategoria(this.nuevaCategoria).then(() => {
      console.log('Categoria agregada');
    })
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaEditando = categoria.id!;
    this.nombreEditado = categoria.nombre;
    this.descripcionEditada = categoria.descripcion;
    this.cdr.detectChanges();
  }

  guardarEdicion(categoria: Categoria) {
    this.categoriaService
    .actualizarCategoria(categoria.id!, {
      nombre: this.nombreEditado,
      descripcion: this.descripcionEditada,
    })
    .then(() => {
      console.log('Categoria actualizada');
    });
    this.categoriaEditando = null;
  }

  cancelarEdicion() {
    this.categoriaEditando = null;
  }
  //tarea
  alterarCategoria(categoria: Categoria) {
    this.categoriaService
    .actualizarCategoria(categoria.id!, {
      activo: !categoria.activo,
    })
  }

  eliminarCategoria(id: string) {
    if (confirm('¿esta seguro de eliminar esta categoria?'))
      this.categoriaService.eliminarCategoria(id).then(() => {
      console.log('Categoria Eliminada');
    });
  }
}
