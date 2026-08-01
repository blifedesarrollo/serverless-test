import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class VentasRepoHelper {
  aplicarFiltros(query: Knex.QueryBuilder, filtros: any): Knex.QueryBuilder {
    if (!filtros) return query;

    if (filtros.folio) {
      query.whereILike('v.folio', `%${String(filtros.folio).trim()}%`);
    }

    if (filtros.canal_venta) {
      query.where('v.canal_venta', String(filtros.canal_venta).trim());
    }

    if (filtros.fecha_inicio) {
      query.whereRaw('DATE(v.fecha_venta) >= ?', [filtros.fecha_inicio]);
    }

    if (filtros.fecha_fin) {
      query.whereRaw('DATE(v.fecha_venta) <= ?', [filtros.fecha_fin]);
    }

    return query;
  }

  aplicarOrden(query: Knex.QueryBuilder, filtros: any): Knex.QueryBuilder {
    if (filtros?.sort) {
      const [campo, dir] = String(filtros.sort).split(':');

      const columnasPermitidas: Record<string, string> = {
        folio: 'v.folio',
        canal_venta: 'v.canal_venta',
        status: 'v.status',
        subtotal: 'v.subtotal',
        total_costo: 'v.total_costo',
        total_venta: 'v.total_venta',
        utilidad_total: 'v.utilidad_total',
        fecha_venta: 'v.fecha_venta',
        fecha_creacion: 'v.fecha_creacion',
      };

      const columna = columnasPermitidas[campo] ?? 'v.fecha_venta';
      const direccion = dir === 'asc' ? 'asc' : 'desc';

      return query.orderBy(columna, direccion);
    }

    return query.orderBy('v.venta_id', 'desc');
  }

  aplicarPaginacion(
    query: Knex.QueryBuilder,
    page: number,
    limit: number,
  ): Knex.QueryBuilder {
    const pagina = Number(page) > 0 ? Number(page) : 1;
    const limite = Number(limit) > 0 ? Number(limit) : 20;
    const offset = (pagina - 1) * limite;

    return query.limit(limite).offset(offset);
  }
}