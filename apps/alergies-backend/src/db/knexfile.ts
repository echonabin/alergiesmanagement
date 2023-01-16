import { Knex } from 'knex';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const config: IKnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'allergiesmanagement',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'allergiestest',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'apps/alergies-backend/src/db/migrations',
    },
  },
};

export default config;
