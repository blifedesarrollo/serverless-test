import { Injectable, NotFoundException } from '@nestjs/common';
import { ComprasRepoAction } from './repositories/compras.repoAction';
import { ComprasRepoData } from './repositories/compras.repoData';
import { FiltrosComprasDTO } from './dto/compras.dto';

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

  async obtenerCompras(filtros: FiltrosComprasDTO, empresaId: number) {
    return await this.repoData.obtenerCompras(filtros, empresaId);
  }

  async obtenerCompraPorUUID(uuid: string, empresaId: number) {
    const compra = await this.repoData.obtenerCompraPorUUID(uuid, empresaId);

    if (!compra) {
      throw new NotFoundException('Compra no encontrada');
    }

    return compra;
  }
}