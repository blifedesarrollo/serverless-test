import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';
import { FiltrosComprasDTO } from '../dto/compras.dto';

@Injectable()
export class ComprasRepoData {
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
        'status',
      )
      .whereIn('producto_uuid', productosUuid)
      .andWhere('empresa_id', empresaId);
  }

  async obtenerCompras(filtros: FiltrosComprasDTO, empresaId: number) {
    const query = this.knex('compras')
      .select(
        'compra_uuid',
        'folio',
        'status',
        'subtotal',
        'total_compra',
        'fecha_compra',
        'fecha_creacion',
        'fecha_actualizacion',
      )
      .where('empresa_id', empresaId)
      .orderBy('compra_id', 'desc');

    if (filtros.folio) {
      query.whereILike('folio', `%${filtros.folio.trim()}%`);
    }

    const compras = await query;

    return {
      compras,
      total: compras.length,
    };
  }

  async obtenerCompraPorUUID(compraUuid: string, empresaId: number) {
    const compra = await this.knex('compras')
      .select(
        'compra_id',
        'compra_uuid',
        'folio',
        'status',
        'subtotal',
        'total_compra',
        'fecha_compra',
        'fecha_creacion',
        'fecha_actualizacion',
      )
      .where('compra_uuid', compraUuid)
      .andWhere('empresa_id', empresaId)
      .first();

    if (!compra) {
      return null;
    }

    const partidas = await this.knex('compras_detalle as cd')
      .leftJoin('productos as p', 'p.producto_id', 'cd.producto_id')
      .select(
        'p.producto_uuid',
        this.knex.raw('COALESCE(cd.sku_snapshot, p.sku) as sku'),
        this.knex.raw('COALESCE(cd.producto_nombre_snapshot, p.nombre) as nombre'),
        'cd.cantidad',
        'cd.costo_unitario',
        'cd.costo_total',
      )
      .where('cd.compra_id', compra.compra_id)
      .orderBy('cd.compra_detalle_id', 'asc');

    return {
      compra_uuid: compra.compra_uuid,
      folio: compra.folio,
      status: compra.status,
      subtotal: compra.subtotal,
      total_compra: compra.total_compra,
      fecha_compra: compra.fecha_compra,
      fecha_creacion: compra.fecha_creacion,
      fecha_actualizacion: compra.fecha_actualizacion,
      partidas,
    };
  }
}