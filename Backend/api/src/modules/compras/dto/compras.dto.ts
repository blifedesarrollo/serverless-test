import {
  CompraCreadaResponseValidator,
  CompraDetalleResponseValidator,
  ComprasListaResponseValidator,
  CrearCompraValidator,
  FiltrosComprasValidator,
} from './compras.validator';

export class CrearCompraDTO extends CrearCompraValidator {}
export class FiltrosComprasDTO extends FiltrosComprasValidator {}

export class CompraCreadaResponseDTO extends CompraCreadaResponseValidator {}
export class ComprasListaResponseDTO extends ComprasListaResponseValidator {}
export class CompraDetalleResponseDTO extends CompraDetalleResponseValidator {}