import { Categoria } from './categoria';
export interface Producto {

    categoriaId: string;
    categoriaNombre: string;

    id?: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    creadoEn: Date;
}
