import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ActualizarProductoDTO, CrearProductoDTO } from './dto/productos.dto';
import { ProductosService } from './productos.service';
import { ProductosBO } from './repositories/productos.bo';

@Injectable()
export class ProductosCoordinator {
  constructor(
    private readonly service: ProductosService,
    private readonly bo: ProductosBO,
  ) {}

  async crearProducto(dto: CrearProductoDTO) {
    const empresa = await this.service.obtenerEmpresaActiva();

    const existeSku = await this.service.obtenerPorSKU(dto.sku, empresa.empresa_id);

    if (existeSku) {
      throw new ConflictException(`Ya existe un producto con el SKU '${dto.sku}'`);
    }

    const nuevoProducto = this.bo.prepararNuevoProducto(dto, empresa.empresa_id);
    const producto = await this.service.crearProducto(nuevoProducto);

    return {
      meta: { message: 'Producto creado exitosamente' },
      producto,
    };
  }

  async actualizarProducto(uuid: string, dto: ActualizarProductoDTO) {
    const empresa = await this.service.obtenerEmpresaActiva();
    const productoActual = await this.service.obtenerProductoPorUUID(uuid, empresa.empresa_id);

    if (!productoActual) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (productoActual.status === 'eliminado') {
      throw new UnprocessableEntityException('El producto está eliminado y no puede editarse');
    }

    if (dto.sku && dto.sku.trim().toLowerCase() !== productoActual.sku.trim().toLowerCase()) {
      const existeSku = await this.service.obtenerPorSKU(dto.sku, empresa.empresa_id);

      if (existeSku && existeSku.producto_uuid !== uuid) {
        throw new ConflictException(`Ya existe un producto con el SKU '${dto.sku}'`);
      }
    }

    const datosActualizados = this.bo.prepararActualizarProducto(dto);
    const producto = await this.service.actualizarProducto(uuid, datosActualizados);

    return {
      meta: { message: 'Producto actualizado exitosamente' },
      producto,
    };
  }

  async eliminarProducto(uuid: string) {
    const empresa = await this.service.obtenerEmpresaActiva();
    const productoActual = await this.service.obtenerProductoPorUUID(uuid, empresa.empresa_id);

    if (!productoActual) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (productoActual.status === 'eliminado') {
      throw new ConflictException('El producto ya fue eliminado');
    }

    const producto = await this.service.eliminarProducto(uuid);

    return {
      meta: { message: 'Producto eliminado exitosamente' },
      producto,
    };
  }
}