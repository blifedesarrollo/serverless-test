import type { Knex } from 'knex';

const tableName = 'productos';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('producto_id').primary();
    table
      .uuid('producto_uuid')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table
      .integer('empresa_id')
      .unsigned()
      .notNullable()
      .references('empresa_id')
      .inTable('empresas')
      .onDelete('RESTRICT');

    table.string('sku', 50).notNullable();
    table.string('upc', 50).nullable();

    table.string('nombre', 150).notNullable();
    table.text('descripcion').nullable();
    table.text('url_imagen').nullable();

    table.decimal('precio_compra', 14, 2).notNullable().defaultTo(0);
    table.decimal('precio_venta', 14, 2).notNullable().defaultTo(0);

    table
      .string('status', 20)
      .notNullable()
      .defaultTo('activo')
      .comment('activo | inactivo | eliminado');

    table.timestamp('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').notNullable().defaultTo(knex.fn.now());

    table.index(['empresa_id']);
    table.index(['sku']);
    table.index(['upc']);
    table.index(['nombre']);
    table.index(['status']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}