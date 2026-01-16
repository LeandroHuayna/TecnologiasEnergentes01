import { Component, OnInit} from '@angular/core';
import { Usuario } from './../../../../services/usuario';
import { Usuarios } from './../../../../models/usuarios.model';

@Component({
  selector: 'app-desactivar-usuario',
  standalone: false,
  templateUrl: './desactivar-usuario.html',
  styleUrls: ['./desactivar-usuario.css'],
})
export class DesactivarUsuario implements OnInit {
  
  usuarios: Usuarios[] = [];

  constructor(
    private usuarioService: Usuario,
    //private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Obtener todos los usuarios al iniciar el componente
    this.usuarioService.ObtenerUsuarios().subscribe({
      next: (usuarios: Usuarios[]) => {
        this.usuarios = usuarios;
      },
      error: (err) => console.error('Error al obtener usuarios:', err),
    });
    //this.cdr.detectChanges();
  }

  // Cambiar el estado "activo" de un usuario
  cambiarEstado(usuario: Usuarios): void {
    if (!usuario.uid) return;

    const nuevoEstado = !usuario.activo; // alterna true/false

    this.usuarioService
      .desactivarUsuario(usuario.uid, nuevoEstado)
      .then(() => {
        usuario.activo = nuevoEstado; // actualizar la vista
      })
      .catch((err) => console.error('Error al cambiar estado:', err));
  }
}
