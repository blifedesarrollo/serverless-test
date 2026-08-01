import {Body,Controller,Get,Param,ParseUUIDPipe,Post,Query,} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequiereToken } from 'src/decorators/token.decorator';
import { VentasCoordinator } from './ventas.coordinator';
import { VentasService } from './ventas.service';
import { CrearVentaDTO, FiltrosVentasDTO } from './dto/ventas.dto';

@ApiTags('Ventas')
@ApiHeader({
  name: 'x-api-token',
  required: false,
  description: 'Token estático de acceso',
})
@Controller('ventas')
export class VentasController {
  constructor(
    private readonly coordinator: VentasCoordinator,
    private readonly service: VentasService,
  ) {}

  @Get()
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener lista de ventas' })
  async obtenerVentas(@Query() filtros: FiltrosVentasDTO) {
    const empresa = await this.service.obtenerEmpresaActiva();
    return await this.service.obtenerVentas(filtros, empresa.empresa_id);
  }

  @Get(':uuid')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener una venta por UUID con sus partidas' })
  async obtenerVentaPorUUID(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    const empresa = await this.service.obtenerEmpresaActiva();
    return await this.service.obtenerVentaPorUUID(uuid, empresa.empresa_id);
  }

  @Post()
  @RequiereToken()
  @ApiOperation({ summary: 'Registrar una venta' })
  async crearVenta(@Body() dto: CrearVentaDTO) {
    return await this.coordinator.crearVenta(dto);
  }
}