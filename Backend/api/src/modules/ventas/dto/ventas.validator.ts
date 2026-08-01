import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
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