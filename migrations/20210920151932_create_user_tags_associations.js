'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.uuid('tagId').references('tags.id').onDelete('CASCADE').onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
