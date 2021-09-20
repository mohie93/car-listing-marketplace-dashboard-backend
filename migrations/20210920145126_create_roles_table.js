'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('roles').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('roles', (table) => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('description').defaultTo('')
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
