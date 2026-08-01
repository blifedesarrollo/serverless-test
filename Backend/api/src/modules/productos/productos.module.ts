import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosCoordinator } from './productos.coordinator';
import { ProductosService } from './productos.service';
import { ProductosBO } from './repositories/productos.bo';
import { ProductosRepoAction } from './repositories/productos.repoAction';
import { ProductosRepoData } from './repositories/productos.repoData';

@Module({
  controllers: [ProductosController],
  providers: [
    ProductosCoordinator,
    ProductosService,
    ProductosBO,
    ProductosRepoData,
    ProductosRepoAction,
  ],
  exports: [ProductosService],
})
export class ProductosModule {}