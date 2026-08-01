import type { Knex } from 'knex';

const tableName = 'ventas';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('venta_id').primary();
    table
      .uuid('venta_uuid')
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
      .string('canal_venta', 30)
      .notNullable()
      .defaultTo('mostrador')
      .comment('mostrador | web | whatsapp | telefono | otro');

    table
      .string('status', 20)
      .notNullable()
      .defaultTo('cobrada')
      .comment('cobrada | cancelada');

    table.decimal('subtotal', 19, 4).notNullable().defaultTo(0);
    table.decimal('total_costo', 19, 4).notNullable().defaultTo(0);
    table.decimal('total_venta', 19, 4).notNullable().defaultTo(0);
    table.decimal('utilidad_total', 19, 4).notNullable().defaultTo(0);

    table.timestamp('fecha_venta').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').notNullable().defaultTo(knex.fn.now());

    table.unique(['folio']);
    table.index(['empresa_id']);
    table.index(['status']);
    table.index(['canal_venta']);
    table.index(['fecha_venta']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}