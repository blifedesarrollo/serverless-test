import {Body,Controller,Get,Param,ParseUUIDPipe,Post,Query,} from '@nestjs/common';
import {ApiHeader,ApiOkResponse,ApiOperation,ApiTags,} from '@nestjs/swagger';
import { RequiereToken } from 'src/decorators/token.decorator';
import { ComprasCoordinator } from './compras.coordinator';
import { ComprasService } from './compras.service';
import {
  CompraDetalleResponseDTO,
  ComprasListaResponseDTO,
  CrearCompraDTO,
  FiltrosComprasDTO,
} from './dto/compras.dto';

@ApiTags('Compras')
@ApiHeader({
  name: 'x-api-token',
  required: false,
  description: 'Token estático de acceso',
})
@Controller('compras')
export class ComprasController {
  constructor(
    private readonly coordinator: ComprasCoordinator,
    private readonly service: ComprasService,
  ) {}

  @Get()
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener lista de compras' })
  @ApiOkResponse({ type: ComprasListaResponseDTO })
  async obtenerCompras(
    @Query() filtros: FiltrosComprasDTO,
  ): Promise<ComprasListaResponseDTO> {
    const empresa = await this.service.obtenerEmpresaActiva();
    return await this.service.obtenerCompras(filtros, empresa.empresa_id);
  }

  @Get(':uuid')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener una compra por UUID con sus partidas' })
  @ApiOkResponse({ type: CompraDetalleResponseDTO })
  async obtenerCompraPorUUID(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<CompraDetalleResponseDTO> {
    const empresa = await this.service.obtenerEmpresaActiva();
    return await this.service.obtenerCompraPorUUID(uuid, empresa.empresa_id);
  }

  @Post()
  @RequiereToken()
  @ApiOperation({ summary: 'Registrar una compra' })
  async crearCompra(@Body() dto: CrearCompraDTO) {
    return await this.coordinator.crearCompra(dto);
  }
}