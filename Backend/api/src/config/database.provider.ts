import { Provider } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { databaseConfig } from './database.config';
import { DATABASE_CONNECTION } from './database.const';

export const databaseProvider: Provider = {
  provide: DATABASE_CONNECTION,
  useFactory: async (): Promise<Knex> => {
    const config = databaseConfig();

    const connection = knex({
      client: 'pg',
      connection: {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
      },
      pool: { min: 2, max: 10 },
    });

    await connection.raw('SELECT 1');
    return connection;
  },
};