import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('allergies', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable().unique().primary();
    table.string('symptoms', 512).notNullable();
    table.string('severity', 255).notNullable();
    table.text('treatments');
    table.text('notes');
    table.string('allergy_image', 512);
    table.boolean('is_active').defaultTo(true);
    table.integer('created_by').notNullable();
    table.integer('updated_by').defaultTo(null);
    table.integer('deleted_by').defaultTo(null);
    table.foreign('created_by').references('user_id').inTable('users');
    table.foreign('updated_by').references('user_id').inTable('users');
    table.foreign('deleted_by').references('user_id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('allergies');
}
