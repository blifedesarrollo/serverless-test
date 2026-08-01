import {
  CrearVentaValidator,
  FiltrosVentasValidator,
  VentaCreadaResponseValidator,
  VentaDetalleResponseValidator,
  VentasListaResponseValidator,
} from './ventas.validator';

export class CrearVentaDTO extends CrearVentaValidator {}
export class FiltrosVentasDTO extends FiltrosVentasValidator {}

export class VentaCreadaResponseDTO extends VentaCreadaResponseValidator {}
export class VentasListaResponseDTO extends VentasListaResponseValidator {}
export class VentaDetalleResponseDTO extends VentaDetalleResponseValidator {}