import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';

@Injectable()
export class VentasRepoAction {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async crearVentaCompleta(
    ventaObj: any,
    partidasBase: any[],
  ): Promise<{ venta_uuid: string; folio: string }> {
    return this.knex.transaction(async (trx) => {
      const ultimaVenta = await trx('ventas')
        .select('folio')
        .whereNotNull('folio')
        .orderBy('venta_id', 'desc')
        .first();

      let nuevoFolioNumero = 1;

      if (ultimaVenta?.folio) {
        const partes = String(ultimaVenta.folio).split('-');
        const ultimoSegmento = partes[partes.length - 1];
        const numeroExtraido = Number(ultimoSegmento);

        if (!Number.isNaN(numeroExtraido) && numeroExtraido > 0) {
          nuevoFolioNumero = numeroExtraido + 1;
        }
      }

      const folio = `VTA-PUE-${String(nuevoFolioNumero).padStart(6, '0')}`;

      const [ventaCreada] = await trx('ventas')
        .insert({
          ...ventaObj,
          folio,
          fecha_creacion: trx.fn.now(),
          fecha_actualizacion: trx.fn.now(),
        })
        .returning(['venta_id', 'venta_uuid', 'folio', 'empresa_id']);

      for (const partida of partidasBase) {
        await trx('ventas_detalle').insert({
          ...partida,
          venta_id: ventaCreada.venta_id,
          fecha_creacion: trx.fn.now(),
          fecha_actualizacion: trx.fn.now(),
        });

        await trx('stock_empresa')
          .where({
            empresa_id: ventaCreada.empresa_id,
            producto_id: partida.producto_id,
          })
          .update({
            stock_actual: this.knex.raw('stock_actual - ?', [partida.cantidad]),
            fecha_actualizacion: trx.fn.now(),
          });
      }

      return {
        venta_uuid: ventaCreada.venta_uuid,
        folio: ventaCreada.folio,
      };
    });
  }
}