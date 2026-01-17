import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaUsuario } from './bienvenida-usuario/bienvenida-usuario';
import { BienvenidaAdmin } from './bienvenida-admin/bienvenida-admin';
import { CambiarRol } from './bienvenida-admin/cambiar-rol/cambiar-rol';
import { DesactivarUsuario } from './bienvenida-admin/desactivar-usuario/desactivar-usuario';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { GestionarCategoria } from './gestionar-categoria/gestionar-categoria';
import { AgregarProducto } from './agregar-producto/agregar-producto';
import { ListarProducto } from './listar-producto/listar-producto';




@NgModule({
  declarations: [
    BienvenidaUsuario,
    BienvenidaAdmin,
    CambiarRol,
    DesactivarUsuario,
    GestionarCategoria,
    AgregarProducto,
    ListarProducto
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class DashboardModule { }
