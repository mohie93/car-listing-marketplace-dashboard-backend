'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('carsAvailability').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('carsAvailability', (table) => {
        table.string('id').primary();
        table.string('startAt').notNullable();
        table.string('endAt').notNullable();
        table.string('carId').references('id').inTable('carsListing').onDelete('CASCADE').onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('carsAvailability');
};