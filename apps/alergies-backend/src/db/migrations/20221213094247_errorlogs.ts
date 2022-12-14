import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('errorlogs', (table) => {
    table.increments('id');
    table.text('description');
    table.integer('error_user');
    table.timestamps(true, true);
    table.foreign('error_user').references('user_id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('errorlogs');
}
