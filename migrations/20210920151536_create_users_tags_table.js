'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('usersTags').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('usersTags', (table) => {
        table.increments('id').primary()
        table.uuid('userId').references('id').inTable('users').onDelete('CASCADE')
        table.uuid('tageId').references('id').inTable('tags').onDelete('CASCADE')
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usersTags');
};
