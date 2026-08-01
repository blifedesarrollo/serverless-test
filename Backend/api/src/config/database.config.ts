export interface DatabaseCredentials {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface DatabaseConfig {
  database: DatabaseCredentials;
}

export const databaseConfig = (): DatabaseConfig => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5438,
    user: process.env.DB_USER || 'usuario_test',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'prueba_test',
  },
});

export const getDatabaseConfig = (): DatabaseCredentials => databaseConfig().database;