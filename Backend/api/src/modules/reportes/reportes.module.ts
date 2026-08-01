import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { ReportesRepoData } from './repositories/reportes.repoData';
import { ReportesRepoHelper } from './repositories/reportes.repoHelper';

@Module({
  controllers: [ReportesController],
  providers: [
    ReportesService,
    ReportesRepoData,
    ReportesRepoHelper,
  ],
})
export class ReportesModule {}