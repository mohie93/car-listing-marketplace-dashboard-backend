'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('usersRoles').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('usersRoles', (table) => {
        table.increments('id').primary()
        table.uuid('userId').references('id').inTable('users').onDelete('CASCADE')
        table.uuid('roleId').references('id').inTable('roles').onDelete('CASCADE')
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usersRoles');
};
