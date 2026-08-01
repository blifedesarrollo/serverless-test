import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';
import { FiltrosVentasDTO } from '../dto/ventas.dto';
import { VentasRepoHelper } from './ventas.repoHelper';

@Injectable()
export class VentasRepoData {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
    private readonly helper: VentasRepoHelper,
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

  async obtenerVentas(filtros: FiltrosVentasDTO, empresaId: number) {
    const filtrosEfectivos = {
      ...filtros,
      page: filtros?.page ?? 1,
      limit: filtros?.limit ?? 20,
    };

    const query = this.knex('ventas as v')
      .select(
        'v.venta_uuid',
        'v.folio',
        'v.canal_venta',
        'v.status',
        'v.subtotal',
        'v.total_costo',
        'v.total_venta',
        'v.utilidad_total',
        'v.fecha_venta',
        'v.fecha_creacion',
        'v.fecha_actualizacion',
      )
      .where('v.empresa_id', empresaId);

    this.helper.aplicarFiltros(query, filtrosEfectivos);
    this.helper.aplicarOrden(query, filtrosEfectivos);
    this.helper.aplicarPaginacion(
      query,
      filtrosEfectivos.page,
      filtrosEfectivos.limit,
    );

    const queryCount = this.knex('ventas as v')
      .count({ total: 'v.venta_id' })
      .where('v.empresa_id', empresaId);

    this.helper.aplicarFiltros(queryCount, filtrosEfectivos);

    const [ventas, conteo] = await Promise.all([
      query,
      queryCount.first() as Promise<{ total: string | number }>,
    ]);

    return {
      ventas,
      total: Number(conteo?.total ?? 0),
      page: filtrosEfectivos.page,
      limit: filtrosEfectivos.limit,
    };
  }

  async obtenerVentaPorUUID(uuid: string, empresaId: number) {
    const venta = await this.knex('ventas as v')
      .select(
        'v.venta_id',
        'v.venta_uuid',
        'v.folio',
        'v.canal_venta',
        'v.status',
        'v.subtotal',
        'v.total_costo',
        'v.total_venta',
        'v.utilidad_total',
        'v.fecha_venta',
        'v.fecha_creacion',
        'v.fecha_actualizacion',
      )
      .where('v.venta_uuid', uuid)
      .andWhere('v.empresa_id', empresaId)
      .first();

    if (!venta) return null;

    const partidas = await this.knex('ventas_detalle as vd')
      .leftJoin('productos as p', 'p.producto_id', 'vd.producto_id')
      .select(
        'p.producto_uuid',
        this.knex.raw('COALESCE(vd.sku_snapshot, p.sku) as sku'),
        this.knex.raw('COALESCE(vd.producto_nombre_snapshot, p.nombre) as nombre'),
        'vd.cantidad',
        'vd.precio_unitario',
        'vd.costo_unitario',
        'vd.subtotal',
        'vd.total',
        'vd.utilidad',
      )
      .where('vd.venta_id', venta.venta_id)
      .orderBy('vd.venta_detalle_id', 'asc');

    return {
      venta_uuid: venta.venta_uuid,
      folio: venta.folio,
      canal_venta: venta.canal_venta,
      status: venta.status,
      subtotal: venta.subtotal,
      total_costo: venta.total_costo,
      total_venta: venta.total_venta,
      utilidad_total: venta.utilidad_total,
      fecha_venta: venta.fecha_venta,
      fecha_creacion: venta.fecha_creacion,
      fecha_actualizacion: venta.fecha_actualizacion,
      partidas,
    };
  }
}