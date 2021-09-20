'use strict';

require('dotenv').config({});

exports.up = function(knex) {
  return knex.schema.hasTable('usersRoles').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('usersRoles', (table) => {
        table.increments('id').primary()
        table.uuid('userId').references('users.id').onDelete('CASCADE')
        table.uuid('roleId').references('roles.id').onDelete('CASCADE')
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usersRoles');
};
