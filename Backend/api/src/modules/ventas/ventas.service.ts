import { Injectable, NotFoundException } from '@nestjs/common';
import { VentasRepoAction } from './repositories/ventas.repoAction';
import { VentasRepoData } from './repositories/ventas.repoData';

@Injectable()
export class VentasService {
  constructor(
    private readonly repoData: VentasRepoData,
    private readonly repoAction: VentasRepoAction,
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

  async obtenerStockPorProductos(productoIds: number[], empresaId: number) {
    return await this.repoData.obtenerStockPorProductos(productoIds, empresaId);
  }

  async crearVentaCompleta(ventaObj: any, partidas: any[]) {
    return await this.repoAction.crearVentaCompleta(ventaObj, partidas);
  }
}