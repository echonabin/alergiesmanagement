import { Knex } from 'knex';

export type IDatabaseInstance = Knex<any, unknown[]>;

export type IDefaultTimeStamp = {
  created_at: string;
  updated_at: string;
};
