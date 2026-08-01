import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─────────────────────────────────────────────
// CREAR DETALLE
// ─────────────────────────────────────────────
export class CompraDetalleValidator {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  producto_uuid!: string;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0.0001)
  cantidad!: number;

  @ApiPropertyOptional({ example: 320.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  costo_unitario?: number;
}

// ─────────────────────────────────────────────
// CREAR
// ─────────────────────────────────────────────
export class CrearCompraValidator {
  @ApiProperty({ type: [CompraDetalleValidator] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CompraDetalleValidator)
  partidas!: CompraDetalleValidator[];
}

// ─────────────────────────────────────────────
// FILTROS
// ─────────────────────────────────────────────
export class FiltrosComprasValidator {
  @ApiPropertyOptional({ example: 'COM-PUE-000001' })
  @IsOptional()
  @IsString()
  folio?: string;
}

// ─────────────────────────────────────────────
// RESPONSES
// ─────────────────────────────────────────────
export class CompraCreadaResponseValidator {
  @ApiProperty({ format: 'uuid' })
  compra_uuid!: string;

  @ApiProperty({ example: 'COM-PUE-000001' })
  folio!: string;

  @ApiProperty({ example: 'Compra creada exitosamente' })
  mensaje!: string;
}

export class CompraListaItemResponseValidator {
  @ApiProperty({ format: 'uuid' })
  compra_uuid!: string;

  @ApiProperty({ example: 'COM-PUE-000001' })
  folio!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  subtotal!: number;

  @ApiProperty()
  total_compra!: number;

  @ApiProperty()
  fecha_compra!: Date;

  @ApiProperty()
  fecha_creacion!: Date;

  @ApiProperty()
  fecha_actualizacion!: Date;
}

export class ComprasListaResponseValidator {
  @ApiProperty({ type: [CompraListaItemResponseValidator] })
  compras!: CompraListaItemResponseValidator[];

  @ApiProperty({ example: 1 })
  total!: number;
}

export class CompraDetalleItemResponseValidator {
  @ApiProperty({ format: 'uuid' })
  producto_uuid!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  cantidad!: number;

  @ApiProperty()
  costo_unitario!: number;

  @ApiProperty()
  costo_total!: number;
}

export class CompraDetalleResponseValidator {
  @ApiProperty({ format: 'uuid' })
  compra_uuid!: string;

  @ApiProperty({ example: 'COM-PUE-000001' })
  folio!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  subtotal!: number;

  @ApiProperty()
  total_compra!: number;

  @ApiProperty()
  fecha_compra!: Date;

  @ApiProperty()
  fecha_creacion!: Date;

  @ApiProperty()
  fecha_actualizacion!: Date;

  @ApiProperty({ type: [CompraDetalleItemResponseValidator] })
  partidas!: CompraDetalleItemResponseValidator[];
}