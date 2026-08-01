import type { Knex } from 'knex';

const tableName = 'ventas_detalle';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('venta_detalle_id').primary();
    table
      .uuid('venta_detalle_uuid')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table
      .integer('venta_id')
      .unsigned()
      .notNullable()
      .references('venta_id')
      .inTable('ventas')
      .onDelete('CASCADE');

    table
      .integer('producto_id')
      .unsigned()
      .notNullable()
      .references('producto_id')
      .inTable('productos')
      .onDelete('RESTRICT');

    table.decimal('cantidad', 14, 4).notNullable().defaultTo(0);
    table.decimal('precio_unitario', 19, 4).notNullable().defaultTo(0);
    table.decimal('costo_unitario', 19, 4).notNullable().defaultTo(0);
    table.decimal('subtotal', 19, 4).notNullable().defaultTo(0);
    table.decimal('total', 19, 4).notNullable().defaultTo(0);
    table.decimal('utilidad', 19, 4).notNullable().defaultTo(0);

    table.string('producto_nombre_snapshot', 255).nullable();
    table.string('sku_snapshot', 100).nullable();

    table.timestamp('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').notNullable().defaultTo(knex.fn.now());

    table.index(['venta_id']);
    table.index(['producto_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}