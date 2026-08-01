import { Injectable } from '@nestjs/common';

@Injectable()
export class ComprasBO {
  prepararCompra(empresaId: number, datos: any, productos: any[]) {
    const productosMap = new Map(
      productos.map((producto) => [producto.producto_uuid, producto]),
    );

    const partidas = datos.partidas.map((partida: any) => {
      const producto = productosMap.get(partida.producto_uuid);
      const costoUnitario = Number(
        partida.costo_unitario ?? producto.precio_compra ?? 0,
      );
      const cantidad = Number(partida.cantidad);
      const costoTotal = Number((cantidad * costoUnitario).toFixed(2));

      return {
        producto_id: producto.producto_id,
        cantidad,
        costo_unitario: costoUnitario,
        costo_total: costoTotal,
        producto_nombre_snapshot: producto.nombre,
        sku_snapshot: producto.sku,
      };
    });

    const subtotal = Number(
      partidas
        .reduce((acc: number, item: any) => acc + Number(item.costo_total), 0)
        .toFixed(2),
    );

    return {
      compra: {
        empresa_id: empresaId,
        status: 'registrada',
        subtotal,
        total_compra: subtotal,
        fecha_compra: new Date(),
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
      },
      partidas,
    };
  }
}