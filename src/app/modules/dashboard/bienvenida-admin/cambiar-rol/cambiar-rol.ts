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
    this.recargarUsuarios();
  }
  //actualiza el rol
  cambiarRol(uid: string): void {

    const rolNuevo = this.rolSeleccionado[uid];

    this.usuarioService.CambiarRol(uid, rolNuevo).then(() => {
      console.log("Rol actualizado para ${uid}")
      this.recargarUsuarios();
    })
    
  }


  recargarUsuarios() {
  this.usuarioService.ObtenerUsuarios().subscribe((usuarios: Usuarios[]) => {
    this.usuarios = usuarios;
    usuarios.forEach(usuario => {
      this.rolSeleccionado[usuario.uid] = usuario.rol;
    });
    // Fuerza que Angular refresque la vista
    // Si tu constructor tiene cdr: ChangeDetectorRef
    // this.cdr.detectChanges();
  });
}

}
