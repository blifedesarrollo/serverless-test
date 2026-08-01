import type { Knex } from 'knex';

const tableName = 'stock_empresa';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('stock_empresa_id').primary();
    table
      .uuid('stock_empresa_uuid')
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

    table
      .integer('producto_id')
      .unsigned()
      .notNullable()
      .references('producto_id')
      .inTable('productos')
      .onDelete('RESTRICT');

    table.decimal('stock_actual', 14, 4).notNullable().defaultTo(0);

    table.timestamp('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').notNullable().defaultTo(knex.fn.now());

    table.unique(['empresa_id', 'producto_id']);
    table.index(['empresa_id']);
    table.index(['producto_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}