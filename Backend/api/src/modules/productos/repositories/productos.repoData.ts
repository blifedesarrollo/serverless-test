import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { FiltrosProductosDTO } from '../dto/productos.dto';
import { ProductosRepoHelper } from './productos.repoHelper';
import { DATABASE_CONNECTION } from 'src/config/database.const';

@Injectable()
export class ProductosRepoData {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async obtenerProductos(filtros: FiltrosProductosDTO, empresaId: number) {
    const query = this.knex('productos as p')
      .leftJoin('stock_empresa as se', 'se.producto_id', 'p.producto_id')
      .select(
        'p.producto_uuid',
        'p.sku',
        'p.upc',
        'p.nombre',
        'p.descripcion',
        'p.precio_compra',
        'p.precio_venta',
        'p.url_imagen',
        'p.status',
        'p.fecha_creacion',
        'p.fecha_actualizacion',
        'se.stock_actual',
      )
      .where('p.empresa_id', empresaId)
      .andWhere(function () {
        this.whereNull('se.empresa_id').orWhere('se.empresa_id', empresaId);
      })
      .whereNot('p.status', 'eliminado');

    ProductosRepoHelper.aplicarFiltros(query, filtros);
    ProductosRepoHelper.aplicarOrdenamiento(query, filtros.sort);

    const productos = await query;

    return {
      productos: productos.map((producto) => ({
        ...producto,
        stock_actual: producto.stock_actual ?? 0,
      })),
      total: productos.length,
    };
  }

  async obtenerProductoPorUUID(productoUuid: string, empresaId: number) {
    const producto = await this.knex('productos as p')
      .leftJoin('stock_empresa as se', 'se.producto_id', 'p.producto_id')
      .select(
        'p.producto_uuid',
        'p.sku',
        'p.upc',
        'p.nombre',
        'p.descripcion',
        'p.precio_compra',
        'p.precio_venta',
        'p.url_imagen',
        'p.status',
        'p.fecha_creacion',
        'p.fecha_actualizacion',
        'se.stock_actual',
      )
      .where('p.producto_uuid', productoUuid)
      .andWhere('p.empresa_id', empresaId)
      .andWhere(function () {
        this.whereNull('se.empresa_id').orWhere('se.empresa_id', empresaId);
      })
      .first();

    if (!producto) {
      return null;
    }

    return {
      ...producto,
      stock_actual: producto.stock_actual ?? 0,
    };
  }

  async obtenerPorSKU(sku: string, empresaId: number) {
    return await this.knex('productos')
      .select('producto_uuid', 'sku', 'nombre')
      .whereRaw('LOWER(sku) = LOWER(?)', [sku.trim()])
      .andWhere('empresa_id', empresaId)
      .first();
  }

  async obtenerEmpresaActiva() {
    return await this.knex('empresas')
      .select('empresa_id', 'nombre')
      .where('status', 'activo')
      .orderBy('empresa_id', 'asc')
      .first();
  }
}