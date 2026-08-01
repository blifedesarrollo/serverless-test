import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


// BASE PRODUCTO
export class ProductoBaseValidator {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  producto_uuid!: string;

  @ApiProperty({ example: 'SKU-001' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  sku!: string;

  @ApiPropertyOptional({ example: '7501234567890', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  upc?: string | null;

  @ApiProperty({ example: 'Proteína Whey Vainilla 1kg' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  nombre!: string;

  @ApiPropertyOptional({
    example: 'Suplemento alimenticio sabor vainilla',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @ApiProperty({ example: 350.5 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_compra!: number;

  @ApiProperty({ example: 499.9 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_venta!: number;

  @ApiPropertyOptional({
    example: 'https://midominio.com/productos/whey-vainilla.jpg',
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  url_imagen?: string | null;

  @ApiProperty({ example: 'activo' })
  @IsString()
  @IsIn(['activo', 'inactivo', 'eliminado'])
  status!: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 4 })
  stock_actual!: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  fecha_creacion!: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  fecha_actualizacion!: Date;
}


// CREAR PRODUCTO
export class CrearProductoValidator {
  @ApiProperty({ example: 'SKU-001' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  sku!: string;

  @ApiPropertyOptional({ example: '7501234567890' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  upc?: string;

  @ApiProperty({ example: 'Proteína Whey Vainilla 1kg' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  nombre!: string;

  @ApiPropertyOptional({ example: 'Suplemento alimenticio sabor vainilla' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 350.5 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_compra!: number;

  @ApiProperty({ example: 499.9 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_venta!: number;

  @ApiPropertyOptional({
    example: 'https://midominio.com/productos/whey-vainilla.jpg',
  })
  @IsOptional()
  @IsUrl()
  url_imagen?: string;

  @ApiPropertyOptional({ example: 'activo', default: 'activo' })
  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo'])
  status?: string;
}

// FILTROS
export class FiltrosProductosValidator {
  @ApiPropertyOptional({ example: 'proteína' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'SKU-001' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ example: '7501234567890' })
  @IsOptional()
  @IsString()
  upc?: string;

  @ApiPropertyOptional({ example: 'activo' })
  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo', 'eliminado'])
  status?: string;

  @ApiPropertyOptional({ example: 'nombre:asc' })
  @IsOptional()
  @IsString()
  sort?: string;
}

// RESPUESTA
export class ProductoResponseValidator {
  @ApiProperty({ format: 'uuid' })
  producto_uuid!: string;

  @ApiProperty()
  sku!: string;

  @ApiPropertyOptional({ nullable: true })
  upc!: string | null;

  @ApiProperty()
  nombre!: string;

  @ApiPropertyOptional({ nullable: true })
  descripcion!: string | null;

  @ApiProperty()
  precio_compra!: number;

  @ApiProperty()
  precio_venta!: number;

  @ApiPropertyOptional({ nullable: true })
  url_imagen!: string | null;

  @ApiProperty()
  status!: string;

  @ApiProperty({ example: 0 })
  stock_actual!: number;

  @ApiProperty()
  fecha_creacion!: Date;

  @ApiProperty()
  fecha_actualizacion!: Date;
}

export class ProductosListaResponseValidator {
  @ApiProperty({ type: [ProductoResponseValidator] })
  productos!: ProductoResponseValidator[];

  @ApiProperty({ example: 1 })
  total!: number;
}



// ─────────────────────────────────────────────
// ACTUALIZAR
// ─────────────────────────────────────────────
export class ActualizarProductoValidator {
  @ApiPropertyOptional({ example: 'SKU-001' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  sku?: string;

  @ApiPropertyOptional({ example: '7501234567890', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  upc?: string | null;

  @ApiPropertyOptional({ example: 'Proteína Whey Vainilla 1kg' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  nombre?: string;

  @ApiPropertyOptional({
    example: 'Suplemento alimenticio sabor vainilla',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @ApiPropertyOptional({ example: 350.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_compra?: number;

  @ApiPropertyOptional({ example: 499.9 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_venta?: number;

  @ApiPropertyOptional({
    example: 'https://midominio.com/productos/whey-vainilla.jpg',
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  url_imagen?: string | null;

  @ApiPropertyOptional({ example: 'activo' })
  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo'])
  status?: string;
}