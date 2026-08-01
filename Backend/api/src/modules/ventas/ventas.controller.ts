import { Body, Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequiereToken } from 'src/decorators/token.decorator';
import { VentasCoordinator } from './ventas.coordinator';
import { CrearVentaDTO } from './dto/ventas.dto';

@ApiTags('Ventas')
@ApiHeader({
  name: 'x-api-token',
  required: false,
  description: 'Token estático de acceso',
})
@Controller('ventas')
export class VentasController {
  constructor(private readonly coordinator: VentasCoordinator) {}

  @Post()
  @RequiereToken()
  @ApiOperation({ summary: 'Registrar una venta' })
  async crearVenta(@Body() dto: CrearVentaDTO) {
    return await this.coordinator.crearVenta(dto);
  }
}