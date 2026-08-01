import { Knex } from 'knex';
import { FiltrosProductosDTO } from '../dto/productos.dto';

export class ProductosRepoHelper {
  static aplicarFiltros(
    query: Knex.QueryBuilder,
    filtros: FiltrosProductosDTO,
  ): void {
    if (filtros.nombre) {
      query.whereILike('p.nombre', `%${filtros.nombre.trim()}%`);
    }

    if (filtros.sku) {
      query.whereILike('p.sku', `%${filtros.sku.trim()}%`);
    }

    if (filtros.upc) {
      query.whereILike('p.upc', `%${filtros.upc.trim()}%`);
    }

    if (filtros.status) {
      query.where('p.status', filtros.status);
    }
  }

  static aplicarOrdenamiento(
    query: Knex.QueryBuilder,
    sort?: string,
  ): void {
    const columnasPermitidas: Record<string, string> = {
      nombre: 'p.nombre',
      sku: 'p.sku',
      status: 'p.status',
      fecha_creacion: 'p.fecha_creacion',
    };

    if (!sort) {
      query.orderBy('p.nombre', 'asc');
      return;
    }

    const [campo, direccion] = sort.split(':');
    const columna = columnasPermitidas[campo] || 'p.nombre';
    const orden = direccion?.toLowerCase() === 'desc' ? 'desc' : 'asc';

    query.orderBy(columna, orden);
  }
}