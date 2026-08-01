import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosBO {
  prepararNuevoProducto(datos: any, empresaId: number) {
    return {
      empresa_id: empresaId,
      sku: String(datos.sku).trim(),
      upc: datos.upc ? String(datos.upc).trim() : null,
      nombre: String(datos.nombre).trim(),
      descripcion: datos.descripcion ? String(datos.descripcion).trim() : null,
      precio_compra: Number(datos.precio_compra),
      precio_venta: Number(datos.precio_venta),
      url_imagen: datos.url_imagen ? String(datos.url_imagen).trim() : null,
      status: datos.status ?? 'activo',
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
    };
  }

  prepararActualizarProducto(datos: any) {
    const data: Record<string, any> = {
      fecha_actualizacion: new Date(),
    };

    if (datos.sku !== undefined) {
      data.sku = String(datos.sku).trim();
    }

    if (datos.upc !== undefined) {
      data.upc = datos.upc ? String(datos.upc).trim() : null;
    }

    if (datos.nombre !== undefined) {
      data.nombre = String(datos.nombre).trim();
    }

    if (datos.descripcion !== undefined) {
      data.descripcion = datos.descripcion ? String(datos.descripcion).trim() : null;
    }

    if (datos.precio_compra !== undefined) {
      data.precio_compra = Number(datos.precio_compra);
    }

    if (datos.precio_venta !== undefined) {
      data.precio_venta = Number(datos.precio_venta);
    }

    if (datos.url_imagen !== undefined) {
      data.url_imagen = datos.url_imagen ? String(datos.url_imagen).trim() : null;
    }

    if (datos.status !== undefined) {
      data.status = String(datos.status);
    }

    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    return data;
  }
}