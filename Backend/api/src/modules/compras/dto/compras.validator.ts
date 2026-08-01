import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class CrearCompraValidator {
  @ApiProperty({ type: [CompraDetalleValidator] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CompraDetalleValidator)
  partidas!: CompraDetalleValidator[];
}

export class CompraCreadaResponseValidator {
  @ApiProperty({ format: 'uuid' })
  compra_uuid!: string;

  @ApiProperty({ example: 'COM-PUE-000001' })
  folio!: string;

  @ApiProperty({ example: 'Compra creada exitosamente' })
  mensaje!: string;
}