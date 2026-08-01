import { Injectable } from '@nestjs/common';

@Injectable()
export class VentasBO {
  prepararVenta(empresaId: number, datos: any, productos: any[]) {
    const productosMap = new Map(
      productos.map((producto) => [producto.producto_uuid, producto]),
    );

    const partidas = datos.partidas.map((partida: any) => {
      const producto = productosMap.get(partida.producto_uuid);

      const cantidad = Number(partida.cantidad);
      const precioUnitario = Number(producto.precio_venta ?? 0);
      const costoUnitario = Number(producto.precio_compra ?? 0);

      const subtotal = Number((cantidad * precioUnitario).toFixed(2));
      const total = subtotal;
      const utilidad = Number(((precioUnitario - costoUnitario) * cantidad).toFixed(2));

      return {
        producto_id: producto.producto_id,
        cantidad,
        precio_unitario: precioUnitario,
        costo_unitario: costoUnitario,
        subtotal,
        total,
        utilidad,
        producto_nombre_snapshot: producto.nombre,
        sku_snapshot: producto.sku,
      };
    });

    const subtotal = Number(
      partidas.reduce((acc: number, item: any) => acc + Number(item.subtotal), 0).toFixed(2),
    );

    const totalCosto = Number(
      partidas.reduce(
        (acc: number, item: any) => acc + Number(item.costo_unitario) * Number(item.cantidad),
        0,
      ).toFixed(2),
    );

    const totalVenta = Number(
      partidas.reduce((acc: number, item: any) => acc + Number(item.total), 0).toFixed(2),
    );

    const utilidadTotal = Number((totalVenta - totalCosto).toFixed(2));

    return {
      venta: {
        empresa_id: empresaId,
        canal_venta: datos.canal_venta ?? 'mostrador',
        status: 'cobrada',
        subtotal,
        total_costo: totalCosto,
        total_venta: totalVenta,
        utilidad_total: utilidadTotal,
        fecha_venta: new Date(),
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
      },
      partidas,
    };
  }
}