import { Module } from '@nestjs/common';
import { ComprasController } from './compras.controller';
import { ComprasCoordinator } from './compras.coordinator';
import { ComprasService } from './compras.service';
import { ComprasBO } from './repositories/compras.bo';
import { ComprasRepoAction } from './repositories/compras.repoAction';
import { ComprasRepoData } from './repositories/compras.repoData';

@Module({
  controllers: [ComprasController],
  providers: [
    ComprasCoordinator,
    ComprasService,
    ComprasBO,
    ComprasRepoData,
    ComprasRepoAction,
  ],
})
export class ComprasModule {}