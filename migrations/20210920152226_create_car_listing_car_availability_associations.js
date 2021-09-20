'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('carsAvailability').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('carsAvailability', (table) => {
        table.uuid('carId').references('cars.id').onDelete('CASCADE').onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('carsAvailability');
};
