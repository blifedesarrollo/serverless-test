import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';

@Injectable()
export class ProductosRepoAction {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async insertarProducto(nuevoProducto: any) {
    const trx = await this.knex.transaction();

    try {
      const [producto] = await trx('productos')
        .insert(nuevoProducto)
        .returning(['producto_id', 'producto_uuid', 'empresa_id', 'sku', 'nombre']);

      await trx('stock_empresa').insert({
        empresa_id: producto.empresa_id,
        producto_id: producto.producto_id,
        stock_actual: 0,
        fecha_creacion: trx.fn.now(),
        fecha_actualizacion: trx.fn.now(),
      });

      await trx.commit();

      return {
        producto_uuid: producto.producto_uuid,
        sku: producto.sku,
        nombre: producto.nombre,
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async actualizarProducto(productoUuid: string, datosActualizados: any) {
    await this.knex('productos')
      .where('producto_uuid', productoUuid)
      .update(datosActualizados);

    return await this.knex('productos')
      .select('producto_uuid', 'sku', 'nombre')
      .where('producto_uuid', productoUuid)
      .first();
  }

  async eliminarProducto(productoUuid: string) {
    await this.knex('productos')
      .where('producto_uuid', productoUuid)
      .update({
        status: 'eliminado',
        fecha_actualizacion: new Date(),
      });

    return await this.knex('productos')
      .select('producto_uuid', 'sku', 'nombre', 'status')
      .where('producto_uuid', productoUuid)
      .first();
  }
}