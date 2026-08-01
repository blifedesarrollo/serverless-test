import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasCoordinator } from './ventas.coordinator';
import { VentasService } from './ventas.service';
import { VentasBO } from './repositories/ventas.bo';
import { VentasRepoAction } from './repositories/ventas.repoAction';
import { VentasRepoData } from './repositories/ventas.repoData';
import { VentasRepoHelper } from './repositories/ventas.repoHelper';

@Module({
  controllers: [VentasController],
  providers: [
    VentasCoordinator,
    VentasService,
    VentasBO,
    VentasRepoAction,
    VentasRepoData,
    VentasRepoHelper,
  ],
})
export class VentasModule {}