'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('carsListing').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('carsListing', (table) => {
        table.uuid('id').primary();
        table.string('model').notNullable();
        table.string('brand').notNullable();
        table.string('dayPrice').notNullable();
        table.json('location').notNullable();
        table.specificType('features', 'text ARRAY').notNullable();
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('carsListing');
};
