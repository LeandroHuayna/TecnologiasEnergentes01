import { Usuario } from './../../../../services/usuario';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuarios } from '../../../../models/usuarios.model';


@Component({
  selector: 'app-cambiar-rol',
  standalone: false,
  templateUrl: './cambiar-rol.html',
  styleUrl: './cambiar-rol.css',
})
export class CambiarRol implements OnInit {

  usuarios : Usuarios[] = [];
  
  rolSeleccionado: { [uid: string] : string} = {};
  constructor(private usuarioService : Usuario, cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.usuarioService.ObtenerUsuarios().subscribe((usuarios :Usuarios[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      usuarios.forEach((Usuario) => {
        this.rolSeleccionado[Usuario.uid] = Usuario.rol;
      });
    });
  }
  //actualiza el rol
  cambiarRol(uid: string): void {

    const rolNuevo = this.rolSeleccionado[uid];

    this.usuarioService.CambiarRol(uid, rolNuevo);
    
  }
}
