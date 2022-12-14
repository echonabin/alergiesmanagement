import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('refresh_tokens', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.string('token', 512).notNullable();
    table.datetime('expires').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
    table.foreign('user_id').references('user_id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('refresh_tokens');
}
