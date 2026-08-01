import {
  FiltrosTopProductosValidator,
  ProductoRecomendadoItemResponseValidator,
  ProductosRecomendadosResponseValidator,
  TopCanalVentaResponseValidator,
  TopProductosResponseValidator,
  UtilidadEmpresaResponseValidator,
} from './reportes.validator';

export class FiltrosTopProductosDTO extends FiltrosTopProductosValidator {}
export class TopProductosResponseDTO extends TopProductosResponseValidator {}
export class UtilidadEmpresaResponseDTO extends UtilidadEmpresaResponseValidator {}
export class TopCanalVentaResponseDTO extends TopCanalVentaResponseValidator {}
export class ProductosRecomendadosResponseDTO extends ProductosRecomendadosResponseValidator {}