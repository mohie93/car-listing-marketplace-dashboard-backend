'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('tags').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('tags', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('description').defaultTo('')
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tags');
};
