import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VentaDetalleValidator {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  producto_uuid!: string;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0.0001)
  cantidad!: number;
}

export class CrearVentaValidator {
  @ApiPropertyOptional({
    example: 'mostrador',
    enum: ['mostrador', 'whatsapp', 'telefono', 'marketplace', 'instagram', 'web'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['mostrador', 'whatsapp', 'telefono', 'marketplace', 'instagram', 'web'])
  canal_venta?: string;

  @ApiProperty({ type: [VentaDetalleValidator] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VentaDetalleValidator)
  partidas!: VentaDetalleValidator[];
}

export class VentaCreadaResponseValidator {
  @ApiProperty({ format: 'uuid' })
  venta_uuid!: string;

  @ApiProperty({ example: 'VTA-PUE-000001' })
  folio!: string;

  @ApiProperty({ example: 'Venta creada exitosamente' })
  mensaje!: string;
}

export class FiltrosVentasValidator {
  @ApiPropertyOptional({ example: 'VTA-PUE-000001' })
  @IsOptional()
  @IsString()
  folio?: string;

  @ApiPropertyOptional({
    example: 'mostrador',
    enum: ['mostrador', 'whatsapp', 'telefono', 'marketplace', 'instagram', 'web'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['mostrador', 'whatsapp', 'telefono', 'marketplace', 'instagram', 'web'])
  canal_venta?: string;

  @ApiPropertyOptional({ example: '2026-08-01' })
  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @ApiPropertyOptional({ example: '2026-08-31' })
  @IsOptional()
  @IsDateString()
  fecha_fin?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ example: 'fecha_venta:desc' })
  @IsOptional()
  @IsString()
  sort?: string;
}

export class VentaListaItemResponseValidator {
  @ApiProperty({ format: 'uuid' })
  venta_uuid!: string;

  @ApiProperty({ example: 'VTA-PUE-000001' })
  folio!: string;

  @ApiProperty({ example: 'mostrador' })
  canal_venta!: string;

  @ApiProperty({ example: 'cobrada' })
  status!: string;

  @ApiProperty({ example: 1000.0 })
  subtotal!: number;

  @ApiProperty({ example: 650.0 })
  total_costo!: number;

  @ApiProperty({ example: 1000.0 })
  total_venta!: number;

  @ApiProperty({ example: 350.0 })
  utilidad_total!: number;

  @ApiProperty()
  fecha_venta!: Date;

  @ApiProperty()
  fecha_creacion!: Date;

  @ApiProperty()
  fecha_actualizacion!: Date;
}

export class VentasListaResponseValidator {
  @ApiProperty({ type: [VentaListaItemResponseValidator] })
  ventas!: VentaListaItemResponseValidator[];

  @ApiProperty({ example: 1 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;
}

export class VentaDetalleItemResponseValidator {
  @ApiProperty({ format: 'uuid' })
  producto_uuid!: string;

  @ApiProperty({ example: 'SKU-001' })
  sku!: string;

  @ApiProperty({ example: 'Producto ejemplo' })
  nombre!: string;

  @ApiProperty({ example: 2 })
  cantidad!: number;

  @ApiProperty({ example: 500.0 })
  precio_unitario!: number;

  @ApiProperty({ example: 325.0 })
  costo_unitario!: number;

  @ApiProperty({ example: 1000.0 })
  subtotal!: number;

  @ApiProperty({ example: 1000.0 })
  total!: number;

  @ApiProperty({ example: 350.0 })
  utilidad!: number;
}

export class VentaDetalleResponseValidator {
  @ApiProperty({ format: 'uuid' })
  venta_uuid!: string;

  @ApiProperty({ example: 'VTA-PUE-000001' })
  folio!: string;

  @ApiProperty({ example: 'mostrador' })
  canal_venta!: string;

  @ApiProperty({ example: 'cobrada' })
  status!: string;

  @ApiProperty({ example: 1000.0 })
  subtotal!: number;

  @ApiProperty({ example: 650.0 })
  total_costo!: number;

  @ApiProperty({ example: 1000.0 })
  total_venta!: number;

  @ApiProperty({ example: 350.0 })
  utilidad_total!: number;

  @ApiProperty()
  fecha_venta!: Date;

  @ApiProperty()
  fecha_creacion!: Date;

  @ApiProperty()
  fecha_actualizacion!: Date;

  @ApiProperty({ type: [VentaDetalleItemResponseValidator] })
  partidas!: VentaDetalleItemResponseValidator[];
}