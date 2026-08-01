import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CrearVentaDTO } from './dto/ventas.dto';
import { VentasService } from './ventas.service';
import { VentasBO } from './repositories/ventas.bo';

@Injectable()
export class VentasCoordinator {
  constructor(
    private readonly service: VentasService,
    private readonly bo: VentasBO,
  ) {}

  async crearVenta(dto: CrearVentaDTO) {
    const empresa = await this.service.obtenerEmpresaActiva();

    const productosUuid = dto.partidas.map((item) => item.producto_uuid);
    const productos = await this.service.obtenerProductosPorUUIDs(
      productosUuid,
      empresa.empresa_id,
    );

    if (productos.length !== productosUuid.length) {
      throw new NotFoundException('Uno o más productos no existen');
    }

    const productoInactivo = productos.find((producto) => producto.status !== 'activo');
    if (productoInactivo) {
      throw new UnprocessableEntityException(
        `El producto '${productoInactivo.sku}' no está disponible para venta`,
      );
    }

    const stockRows = await this.service.obtenerStockPorProductos(
      productos.map((p) => p.producto_id),
      empresa.empresa_id,
    );

    const stockMap = new Map(
      stockRows.map((row: any) => [row.producto_id, Number(row.stock_actual)]),
    );

    for (const partida of dto.partidas) {
      const producto = productos.find((p) => p.producto_uuid === partida.producto_uuid);
      const stockActual = Number(stockMap.get(producto.producto_id) ?? 0);
      const cantidadSolicitada = Number(partida.cantidad);

      if (stockActual <= 0) {
        throw new UnprocessableEntityException(
          `El producto '${producto.sku}' no tiene stock disponible`,
        );
      }

      if (cantidadSolicitada > stockActual) {
        throw new UnprocessableEntityException(
          `Stock insuficiente para '${producto.sku}'. Disponible: ${stockActual}, solicitado: ${cantidadSolicitada}`,
        );
      }
    }

    const payload = this.bo.prepararVenta(empresa.empresa_id, dto, productos);
    const venta = await this.service.crearVentaCompleta(payload.venta, payload.partidas);

    return {
      meta: { message: 'Venta creada exitosamente' },
      venta,
    };
  }
}