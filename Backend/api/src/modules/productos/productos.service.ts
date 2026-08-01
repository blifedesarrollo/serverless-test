import { Injectable, NotFoundException } from '@nestjs/common';
import { FiltrosProductosDTO } from './dto/productos.dto';
import { ProductosRepoAction } from './repositories/productos.repoAction';
import { ProductosRepoData } from './repositories/productos.repoData';

@Injectable()
export class ProductosService {
  constructor(
    private readonly repoData: ProductosRepoData,
    private readonly repoAction: ProductosRepoAction,
  ) {}

  async obtenerEmpresaActiva() {
    const empresa = await this.repoData.obtenerEmpresaActiva();

    if (!empresa) {
      throw new NotFoundException('No existe una empresa activa configurada');
    }

    return empresa;
  }

  async obtenerProductos(filtros: FiltrosProductosDTO, empresaId: number) {
    return await this.repoData.obtenerProductos(filtros, empresaId);
  }

  async obtenerProductoPorUUID(uuid: string, empresaId: number) {
    const producto = await this.repoData.obtenerProductoPorUUID(uuid, empresaId);

    if (!producto || producto.status === 'eliminado') {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async obtenerPorSKU(sku: string, empresaId: number) {
    return await this.repoData.obtenerPorSKU(sku, empresaId);
  }

  async crearProducto(nuevoProducto: any) {
    return await this.repoAction.insertarProducto(nuevoProducto);
  }

  async actualizarProducto(uuid: string, datosActualizados: any) {
    return await this.repoAction.actualizarProducto(uuid, datosActualizados);
  }

  async eliminarProducto(uuid: string) {
    return await this.repoAction.eliminarProducto(uuid);
  }
}