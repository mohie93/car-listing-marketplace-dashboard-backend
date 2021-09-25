'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('firstName').nullable();
        table.string('lastName').nullable();
        table.string('email').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('roleId').references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
