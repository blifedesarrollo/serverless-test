import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';

@Injectable()
export class VentasRepoData {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async obtenerEmpresaActiva() {
    return await this.knex('empresas')
      .select('empresa_id', 'nombre')
      .where('status', 'activo')
      .orderBy('empresa_id', 'asc')
      .first();
  }

  async obtenerProductosPorUUIDs(productosUuid: string[], empresaId: number) {
    return await this.knex('productos')
      .select(
        'producto_id',
        'producto_uuid',
        'sku',
        'nombre',
        'precio_compra',
        'precio_venta',
        'status',
      )
      .whereIn('producto_uuid', productosUuid)
      .andWhere('empresa_id', empresaId);
  }

  async obtenerStockPorProductos(productoIds: number[], empresaId: number) {
    return await this.knex('stock_empresa')
      .select('producto_id', 'stock_actual')
      .where('empresa_id', empresaId)
      .whereIn('producto_id', productoIds);
  }
}