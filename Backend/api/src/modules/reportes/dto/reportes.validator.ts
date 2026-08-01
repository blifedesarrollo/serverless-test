import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FiltrosTopProductosValidator {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class TopProductoItemResponseValidator {
  @ApiProperty({ format: 'uuid' })
  producto_uuid!: string;

  @ApiProperty({ example: 'SKU-001' })
  sku!: string;

  @ApiProperty({ example: 'Producto ejemplo' })
  nombre!: string;

  @ApiProperty({ example: 10 })
  cantidad_vendida!: number;

  @ApiProperty({ example: 5500.0 })
  total_vendido!: number;

  @ApiProperty({ example: 1800.0 })
  utilidad_generada!: number;
}

export class TopProductosResponseValidator {
  @ApiProperty({ type: [TopProductoItemResponseValidator] })
  productos!: TopProductoItemResponseValidator[];

  @ApiProperty({ example: 10 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 5 })
  limit!: number;
}

export class UtilidadEmpresaResponseValidator {
  @ApiProperty({ example: 27810.0 })
  total_gastado!: number;

  @ApiProperty({ example: 3591.0 })
  total_vendido!: number;

  @ApiProperty({ example: 1401.0 })
  utilidad_actual_ventas!: number;

  @ApiProperty({ example: -24219.0 })
  utilidad_vs_gasto!: number;
}

export class TopCanalVentaResponseValidator {
  @ApiProperty({ example: 'mostrador' })
  canal_venta!: string;

  @ApiProperty({ example: 25 })
  total_ventas!: number;

  @ApiProperty({ example: 18500.0 })
  total_ingresos!: number;

  @ApiProperty({ example: 6200.0 })
  utilidad_total!: number;
}

export class ProductoRecomendadoItemResponseValidator {
  @ApiProperty({ format: 'uuid' })
  producto_uuid!: string;

  @ApiProperty({ example: 'SKU-001' })
  sku!: string;

  @ApiProperty({ example: 'Producto ejemplo' })
  nombre!: string;

  @ApiProperty({ example: 150 })
  stock_actual!: number;

  @ApiProperty({ example: 85.5 })
  precio_compra!: number;

  @ApiProperty({ example: 120.0 })
  precio_venta!: number;
}

export class ProductosRecomendadosResponseValidator {
  @ApiProperty({ type: [ProductoRecomendadoItemResponseValidator] })
  productos!: ProductoRecomendadoItemResponseValidator[];

  @ApiProperty({ example: 10 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 5 })
  limit!: number;
}