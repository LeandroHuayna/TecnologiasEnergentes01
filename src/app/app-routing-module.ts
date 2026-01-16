import { CambiarRol } from './modules/dashboard/bienvenida-admin/cambiar-rol/cambiar-rol';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Registrar } from './modules/auth/registrar/registrar';
import { Login } from './modules/auth/login/login';
import { BienvenidaAdmin } from './modules/dashboard/bienvenida-admin/bienvenida-admin';
import { BienvenidaUsuario } from './modules/dashboard/bienvenida-usuario/bienvenida-usuario';
import { DesactivarUsuario } from './modules/dashboard/bienvenida-admin/desactivar-usuario/desactivar-usuario';
import { GestionarCategoria } from './modules/dashboard/gestionar-categoria/gestionar-categoria';

  const routes: Routes = [

    { 
      path: 'admin', 
      component: BienvenidaAdmin,
      children: [             //crea subentradas a cambiar rol y desactivar usuario
        {
          path: 'cambiar-rol',
          component: CambiarRol,
        },
        {
          path: 'desactivar-usuario',
          component: DesactivarUsuario,
        },
        //solo porque ya tenemos el menu admin esta vez
        {
          path: 'gestionar-categoria',
          component: GestionarCategoria,
        },
      ],
    }, 

    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'registrar', component: Registrar},
    { path: 'login', component: Login},
    { path: 'usuario', component: BienvenidaUsuario},
//    { path: 'dashboard', component: Dashboard},
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
