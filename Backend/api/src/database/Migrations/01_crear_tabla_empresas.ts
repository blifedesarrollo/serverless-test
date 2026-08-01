import type { Knex } from 'knex';

const tableName = 'empresas';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('empresa_id').primary();
    table
      .uuid('empresa_uuid')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.string('nombre', 150).notNullable();
    table.string('rfc', 13).nullable();
    table.string('telefono', 20).nullable();
    table.string('email', 150).nullable();
    table.text('direccion').nullable();

    table
      .string('status', 20)
      .notNullable()
      .defaultTo('activo')
      .comment('activo | inactivo');

    table.timestamp('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').notNullable().defaultTo(knex.fn.now());

    table.index(['status']);
    table.index(['rfc']);
    table.index(['nombre']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}