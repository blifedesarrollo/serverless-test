require('ts-node/register');
require('tsconfig-paths/register');
require('dotenv').config();

import type { Knex } from 'knex';

const config: Record<string, Knex.Config> = {
  prueba_test: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './src/database/Migrations',
      extension: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/database/Seeds',
      extension: 'ts',
    },
  },
};

module.exports = config;
export default config;