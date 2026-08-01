import { Injectable, NotFoundException } from '@nestjs/common';
import { FiltrosTopProductosDTO } from './dto/reportes.dto';
import { ReportesRepoData } from './repositories/reportes.repoData';

@Injectable()
export class ReportesService {
  constructor(
    private readonly repoData: ReportesRepoData,
  ) {}

  async obtenerEmpresaActiva() {
    const empresa = await this.repoData.obtenerEmpresaActiva();

    if (!empresa) {
      throw new NotFoundException('No existe una empresa activa configurada');
    }

    return empresa;
  }

  async obtenerTopProductosVendidos(filtros: FiltrosTopProductosDTO) {
    const empresa = await this.obtenerEmpresaActiva();

    return await this.repoData.obtenerTopProductosVendidos(
      filtros,
      empresa.empresa_id,
    );
  }

    async obtenerUtilidadEmpresa() {
    const empresa = await this.obtenerEmpresaActiva();
    return await this.repoData.obtenerUtilidadEmpresa(empresa.empresa_id);
  }

    async obtenerTopCanalVenta() {
    const empresa = await this.obtenerEmpresaActiva();
    return await this.repoData.obtenerTopCanalVenta(empresa.empresa_id);
  }

  async obtenerProductosRecomendados(filtros: FiltrosTopProductosDTO) {
  const empresa = await this.obtenerEmpresaActiva();

  return await this.repoData.obtenerProductosRecomendados(
    filtros,
    empresa.empresa_id,
  );
}
}