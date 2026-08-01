import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('productos', (table) => {
    table.index(['empresa_id', 'status'], 'idx_productos_empresa_status');
    table.index(['empresa_id', 'sku'], 'idx_productos_empresa_sku');
    table.index(['empresa_id', 'nombre'], 'idx_productos_empresa_nombre');
    table.index(['empresa_id', 'upc'], 'idx_productos_empresa_upc');
    table.index(['empresa_id', 'fecha_creacion'], 'idx_productos_empresa_fecha_creacion');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('productos', (table) => {
    table.dropIndex(['empresa_id', 'status'], 'idx_productos_empresa_status');
    table.dropIndex(['empresa_id', 'sku'], 'idx_productos_empresa_sku');
    table.dropIndex(['empresa_id', 'nombre'], 'idx_productos_empresa_nombre');
    table.dropIndex(['empresa_id', 'upc'], 'idx_productos_empresa_upc');
    table.dropIndex(['empresa_id', 'fecha_creacion'], 'idx_productos_empresa_fecha_creacion');
  });
}