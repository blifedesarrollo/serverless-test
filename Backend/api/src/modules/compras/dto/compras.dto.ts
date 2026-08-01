import {
  CompraCreadaResponseValidator,
  CrearCompraValidator,
} from './compras.validator';

export class CrearCompraDTO extends CrearCompraValidator {}
export class CompraCreadaResponseDTO extends CompraCreadaResponseValidator {}