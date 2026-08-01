import type { Knex } from 'knex';

const tableName = 'empresas';

export async function seed(knex: Knex): Promise<void> {
  await knex(tableName).del();

  await knex(tableName).insert([
    {
      nombre: 'B Life',
      rfc: 'BLF260801ABC',
      telefono: '2221234567',
      email: 'contacto@blife.test',
      direccion: 'Av. Juárez 123, Col. Centro, Puebla, Puebla, México, CP 72000',
      status: 'activo',
      fecha_creacion: knex.fn.now(),
      fecha_actualizacion: knex.fn.now(),
    },
  ]);
}