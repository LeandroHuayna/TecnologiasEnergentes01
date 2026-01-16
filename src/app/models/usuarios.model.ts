
export interface Usuarios {
    uid : string;
    email : string;
    rol: 'admin' | 'usuario' | 'cliente';
    activo: boolean;
}