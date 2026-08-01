import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CrearCompraDTO } from './dto/compras.dto';
import { ComprasService } from './compras.service';
import { ComprasBO } from './repositories/compras.bo';

@Injectable()
export class ComprasCoordinator {
  constructor(
    private readonly service: ComprasService,
    private readonly bo: ComprasBO,
  ) {}

  async crearCompra(dto: CrearCompraDTO) {
    const empresa = await this.service.obtenerEmpresaActiva();

    const productosUuid = dto.partidas.map((item) => item.producto_uuid);
    const productos = await this.service.obtenerProductosPorUUIDs(productosUuid, empresa.empresa_id);

    if (productos.length !== productosUuid.length) {
      throw new NotFoundException('Uno o más productos no existen');
    }

    const productoEliminado = productos.find((producto) => producto.status === 'eliminado');
    if (productoEliminado) {
      throw new UnprocessableEntityException(
        `El producto '${productoEliminado.sku}' está eliminado y no puede comprarse`,
      );
    }

    const payload = this.bo.prepararCompra(empresa.empresa_id, dto, productos);
    const compra = await this.service.crearCompraCompleta(payload.compra, payload.partidas);

    return {
      meta: { message: 'Compra creada exitosamente' },
      compra,
    };
  }
}