import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';

@Injectable()
export class ComprasRepoAction {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async crearCompraCompleta(
    compraObj: any,
    partidasBase: any[],
  ): Promise<{ compra_uuid: string; folio: string }> {
    return this.knex.transaction(async (trx) => {
      const ultimaCompra = await trx('compras')
        .select('folio')
        .whereNotNull('folio')
        .orderBy('compra_id', 'desc')
        .first();

      let nuevoFolioNumero = 1;

      if (ultimaCompra?.folio) {
        const partes = String(ultimaCompra.folio).split('-');
        const ultimoSegmento = partes[partes.length - 1];
        const numeroExtraido = Number(ultimoSegmento);

        if (!Number.isNaN(numeroExtraido) && numeroExtraido > 0) {
          nuevoFolioNumero = numeroExtraido + 1;
        }
      }

      const folio = `COM-PUE-${String(nuevoFolioNumero).padStart(6, '0')}`;

      const [compraCreada] = await trx('compras')
        .insert({
          ...compraObj,
          folio,
          fecha_creacion: trx.fn.now(),
          fecha_actualizacion: trx.fn.now(),
        })
        .returning(['compra_id', 'compra_uuid', 'folio', 'empresa_id']);

      for (const partida of partidasBase) {
        await trx('compras_detalle').insert({
          ...partida,
          compra_id: compraCreada.compra_id,
          fecha_creacion: trx.fn.now(),
          fecha_actualizacion: trx.fn.now(),
        });

        const stockExistente = await trx('stock_empresa')
          .where({
            empresa_id: compraCreada.empresa_id,
            producto_id: partida.producto_id,
          })
          .first();

        if (stockExistente) {
          await trx('stock_empresa')
            .where({
              empresa_id: compraCreada.empresa_id,
              producto_id: partida.producto_id,
            })
            .update({
              stock_actual: this.knex.raw('stock_actual + ?', [partida.cantidad]),
              fecha_actualizacion: trx.fn.now(),
            });
        } else {
          await trx('stock_empresa').insert({
            empresa_id: compraCreada.empresa_id,
            producto_id: partida.producto_id,
            stock_actual: partida.cantidad,
            fecha_creacion: trx.fn.now(),
            fecha_actualizacion: trx.fn.now(),
          });
        }

        await trx('productos')
          .where('producto_id', partida.producto_id)
          .update({
            precio_compra: partida.costo_unitario,
            fecha_actualizacion: trx.fn.now(),
          });
      }

      return {
        compra_uuid: compraCreada.compra_uuid,
        folio: compraCreada.folio,
      };
    });
  }
}