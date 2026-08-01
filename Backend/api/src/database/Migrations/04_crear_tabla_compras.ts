import type { Knex } from 'knex';

const tableName = 'compras';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('compra_id').primary();
    table
      .uuid('compra_uuid')
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

    table.string('folio', 30).notNullable();

    table
      .string('status', 20)
      .notNullable()
      .defaultTo('registrada')
      .comment('registrada | cancelada');

    table.decimal('subtotal', 19, 4).notNullable().defaultTo(0);
    table.decimal('total_compra', 19, 4).notNullable().defaultTo(0);

    table.timestamp('fecha_compra').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').notNullable().defaultTo(knex.fn.now());

    table.unique(['folio']);
    table.index(['empresa_id']);
    table.index(['status']);
    table.index(['fecha_compra']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}