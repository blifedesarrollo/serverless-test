import {Body,Controller,Get,Param,ParseUUIDPipe,Patch,Post,Query,} from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ActualizarProductoDTO,
  CrearProductoDTO,
  FiltrosProductosDTO,
  ProductoResponseDTO,
  ProductosListaResponseDTO,
} from './dto/productos.dto';
import { ProductosCoordinator } from './productos.coordinator';
import { ProductosService } from './productos.service';
import { RequiereToken } from 'src/decorators/token.decorator';

@ApiTags('Productos')
@ApiHeader({
  name: 'x-api-token',
  required: false,
  description: 'Token estático de acceso',
})
@Controller('productos')
export class ProductosController {
  constructor(
    private readonly coordinator: ProductosCoordinator,
    private readonly service: ProductosService,
  ) {}

  @Get()
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener lista de productos activos' })
  @ApiOkResponse({ type: ProductosListaResponseDTO })
  async obtenerProductos(
    @Query() filtros: FiltrosProductosDTO,
  ): Promise<ProductosListaResponseDTO> {
    const empresa = await this.service.obtenerEmpresaActiva();
    return await this.service.obtenerProductos(filtros, empresa.empresa_id);
  }

  @Get(':uuid')
  @RequiereToken()
  @ApiOperation({ summary: 'Obtener un producto por UUID' })
  @ApiOkResponse({ type: ProductoResponseDTO })
  async obtenerProducto(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ProductoResponseDTO> {
    const empresa = await this.service.obtenerEmpresaActiva();
    return await this.service.obtenerProductoPorUUID(uuid, empresa.empresa_id);
  }

  @Post()
  @RequiereToken()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  async crearProducto(@Body() dto: CrearProductoDTO) {
    return await this.coordinator.crearProducto(dto);
  }

  @Patch(':uuid')
  @RequiereToken()
  @ApiOperation({ summary: 'Actualizar un producto' })
  async actualizarProducto(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: ActualizarProductoDTO,
  ) {
    return await this.coordinator.actualizarProducto(uuid, dto);
  }

  @Patch(':uuid/eliminar')
  @RequiereToken()
  @ApiOperation({ summary: 'Eliminar lógicamente un producto' })
  async eliminarProducto(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    return await this.coordinator.eliminarProducto(uuid);
  }
}