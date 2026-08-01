import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from 'src/config/database.const';
import { FiltrosTopProductosDTO } from '../dto/reportes.dto';
import { ReportesRepoHelper } from './reportes.repoHelper';

@Injectable()
export class ReportesRepoData {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly knex: Knex,
    private readonly helper: ReportesRepoHelper,
  ) {}

  async obtenerEmpresaActiva() {
    return await this.knex('empresas')
      .select('empresa_id', 'nombre')
      .where('status', 'activo')
      .orderBy('empresa_id', 'asc')
      .first();
  }

  async obtenerTopProductosVendidos(
    filtros: FiltrosTopProductosDTO,
    empresaId: number,
  ) {
    const filtrosEfectivos = {
      ...filtros,
      page: filtros?.page ?? 1,
      limit: filtros?.limit ?? 5,
    };

    const query = this.knex('ventas_detalle as vd')
      .innerJoin('ventas as v', 'v.venta_id', 'vd.venta_id')
      .innerJoin('productos as p', 'p.producto_id', 'vd.producto_id')
      .select(
        'p.producto_uuid',
        'p.sku',
        'p.nombre',
        this.knex.raw('SUM(vd.cantidad) as cantidad_vendida'),
        this.knex.raw('SUM(vd.total) as total_vendido'),
        this.knex.raw('SUM(vd.utilidad) as utilidad_generada'),
      )
      .where('v.empresa_id', empresaId)
      .andWhere('v.status', 'cobrada')
      .groupBy('p.producto_uuid', 'p.sku', 'p.nombre')
      .orderBy('cantidad_vendida', 'desc');

    this.helper.aplicarPaginacion(
      query,
      filtrosEfectivos.page,
      filtrosEfectivos.limit,
    );

    const productos = await query;

    return {
      productos: productos.map((item) => ({
        producto_uuid: item.producto_uuid,
        sku: item.sku,
        nombre: item.nombre,
        cantidad_vendida: Number(item.cantidad_vendida ?? 0),
        total_vendido: Number(item.total_vendido ?? 0),
        utilidad_generada: Number(item.utilidad_generada ?? 0),
      })),
      total: productos.length,
      page: filtrosEfectivos.page,
      limit: filtrosEfectivos.limit,
    };
  }

async obtenerUtilidadEmpresa(empresaId: number) {
  const [compras, ventas] = await Promise.all([
    this.knex('compras')
      .where('empresa_id', empresaId)
      .andWhere('status', 'registrada')
      .sum({ total_gastado: 'total_compra' })
      .first(),

    this.knex('ventas')
      .where('empresa_id', empresaId)
      .andWhere('status', 'cobrada')
      .sum({
        total_vendido: 'total_venta',
        utilidad_actual_ventas: 'utilidad_total',
      })
      .first(),
  ]);

  const total_gastado = Number(compras?.total_gastado ?? 0);
  const total_vendido = Number(ventas?.total_vendido ?? 0);
  const utilidad_actual_ventas = Number(ventas?.utilidad_actual_ventas ?? 0);
  const utilidad_vs_gasto = total_vendido - total_gastado;

  return {
    total_gastado,
    total_vendido,
    utilidad_actual_ventas,
    utilidad_vs_gasto,
  };
}

async obtenerTopCanalVenta(empresaId: number) {
  const canal = await this.knex('ventas')
    .select('canal_venta')
    .count({ total_ventas: 'venta_id' })
    .sum({
      total_ingresos: 'total_venta',
      utilidad_total: 'utilidad_total',
    })
    .where('empresa_id', empresaId)
    .andWhere('status', 'cobrada')
    .groupBy('canal_venta')
    .orderBy('total_ingresos', 'desc')
    .first() as {
      canal_venta?: string;
      total_ventas?: string | number;
      total_ingresos?: string | number;
      utilidad_total?: string | number;
    } | undefined;

  return {
    canal_venta: canal?.canal_venta ?? '',
    total_ventas: Number(canal?.total_ventas ?? 0),
    total_ingresos: Number(canal?.total_ingresos ?? 0),
    utilidad_total: Number(canal?.utilidad_total ?? 0),
  };
}

async obtenerProductosRecomendados(
  filtros: FiltrosTopProductosDTO,
  empresaId: number,
) {
  const filtrosEfectivos = {
    ...filtros,
    page: filtros?.page ?? 1,
    limit: filtros?.limit ?? 5,
  };

  const query = this.knex('stock_empresa as se')
    .innerJoin('productos as p', 'p.producto_id', 'se.producto_id')
    .select(
      'p.producto_uuid',
      'p.sku',
      'p.nombre',
      'p.precio_compra',
      'p.precio_venta',
      'se.stock_actual',
    )
    .where('se.empresa_id', empresaId)
    .andWhere('p.empresa_id', empresaId)
    .andWhere('p.status', 'activo')
    .orderBy('se.stock_actual', 'desc');

  this.helper.aplicarPaginacion(
    query,
    filtrosEfectivos.page,
    filtrosEfectivos.limit,
  );

  const productos = await query;

  return {
    productos: productos.map((item) => ({
      producto_uuid: item.producto_uuid,
      sku: item.sku,
      nombre: item.nombre,
      stock_actual: Number(item.stock_actual ?? 0),
      precio_compra: Number(item.precio_compra ?? 0),
      precio_venta: Number(item.precio_venta ?? 0),
    })),
    total: productos.length,
    page: filtrosEfectivos.page,
    limit: filtrosEfectivos.limit,
  };
}
}