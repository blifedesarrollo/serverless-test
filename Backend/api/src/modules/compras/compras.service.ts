import { Injectable, NotFoundException } from '@nestjs/common';
import { ComprasRepoAction } from './repositories/compras.repoAction';
import { ComprasRepoData } from './repositories/compras.repoData';
@Injectable()
export class ComprasService {
  constructor(
    private readonly repoData: ComprasRepoData,
    private readonly repoAction: ComprasRepoAction,
  ) {}

  async obtenerEmpresaActiva() {
    const empresa = await this.repoData.obtenerEmpresaActiva();

    if (!empresa) {
      throw new NotFoundException('No existe una empresa activa configurada');
    }

    return empresa;
  }

  async obtenerProductosPorUUIDs(productosUuid: string[], empresaId: number) {
    return await this.repoData.obtenerProductosPorUUIDs(productosUuid, empresaId);
  }

  async crearCompraCompleta(compraObj: any, partidas: any[]) {
    return await this.repoAction.crearCompraCompleta(compraObj, partidas);
  }
}