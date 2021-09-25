'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('usersTags').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('usersTags', (table) => {
        table.increments('id').primary();
        table.string('userId').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('tagId').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usersTags');
};
