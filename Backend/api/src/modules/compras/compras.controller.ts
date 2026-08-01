import { Body, Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequiereToken } from 'src/decorators/token.decorator';
import { ComprasCoordinator } from './compras.coordinator';
import { CrearCompraDTO } from './dto/compras.dto';

@ApiTags('Compras')
@ApiHeader({
  name: 'x-api-token',
  required: false,
  description: 'Token estático de acceso',
})
@Controller('compras')
export class ComprasController {
  constructor(private readonly coordinator: ComprasCoordinator) {}

  @Post()
  @RequiereToken()
  @ApiOperation({ summary: 'Registrar una compra' })
  async crearCompra(@Body() dto: CrearCompraDTO) {
    return await this.coordinator.crearCompra(dto);
  }
}