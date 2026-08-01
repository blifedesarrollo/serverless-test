import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequiereToken } from 'src/decorators/token.decorator';
import {
  FiltrosTopProductosDTO,
  ProductosRecomendadosResponseDTO,
  TopCanalVentaResponseDTO,
  TopProductosResponseDTO,
  UtilidadEmpresaResponseDTO,
} from './dto/reportes.dto';
import { ReportesService } from './reportes.service';

@ApiTags('Reportes')
@ApiHeader({
  name: 'x-api-token',
  required: false,
  description: 'Token estático de acceso',
})
@Controller('reportes')
export class ReportesController {
  constructor(
    private readonly service: ReportesService,
  ) {}

  @Get('top-productos')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener productos más vendidos' })
  @ApiOkResponse({ type: TopProductosResponseDTO })
  async obtenerTopProductosVendidos(
    @Query() filtros: FiltrosTopProductosDTO,
  ): Promise<TopProductosResponseDTO> {
    return await this.service.obtenerTopProductosVendidos(filtros);
  }

  @Get('utilidad')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener utilidad general de la empresa' })
  @ApiOkResponse({ type: UtilidadEmpresaResponseDTO })
  async obtenerUtilidadEmpresa(): Promise<UtilidadEmpresaResponseDTO> {
    return await this.service.obtenerUtilidadEmpresa();
  }

  @Get('top-canal-venta')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener el canal de ventas con mayor ingreso' })
  @ApiOkResponse({ type: TopCanalVentaResponseDTO })
  async obtenerTopCanalVenta(): Promise<TopCanalVentaResponseDTO> {
    return await this.service.obtenerTopCanalVenta();
  }

    @Get('productos-recomendados')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener productos recomendados por mayor stock' })
  @ApiOkResponse({ type: ProductosRecomendadosResponseDTO })
  async obtenerProductosRecomendados(
    @Query() filtros: FiltrosTopProductosDTO,
  ): Promise<ProductosRecomendadosResponseDTO> {
    return await this.service.obtenerProductosRecomendados(filtros);
  }
}