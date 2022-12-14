import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id');
    table.string('email').unique().notNullable();
    table.string('password', 512).notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('profile_url', 512);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
