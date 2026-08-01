import {
  ActualizarProductoValidator,
  CrearProductoValidator,
  FiltrosProductosValidator,
  ProductoResponseValidator,
  ProductosListaResponseValidator,
} from './productos.validator';

export class CrearProductoDTO extends CrearProductoValidator {}
export class ActualizarProductoDTO extends ActualizarProductoValidator {}
export class FiltrosProductosDTO extends FiltrosProductosValidator {}

export class ProductoResponseDTO extends ProductoResponseValidator {}
export class ProductosListaResponseDTO extends ProductosListaResponseValidator {}