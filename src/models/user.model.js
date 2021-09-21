'use strict';

const DB = require('../configs/knex');
const { v4: uuidv4 } = require('uuid');

const table = 'users';

class User {
  constructor(payload) {
    this.id = uuidv4();
    this.email = payload.email;
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.roleId = payload.roleId;
  }

  save() {
    const { id, email, firstName, lastName, roleId } = this;
    return DB(table).insert({ id, email, firstName, lastName, roleId });
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getById(id) {
    return DB(table).where({ id }).select('*').first();
  }

  static searchBy(needle) {
    return DB(table)
      .where('email', 'LIKE', `%${needle}%`)
      .orWhere('firstName', 'LIKE', `%${needle}%`)
      .orWhere('lastName', 'LIKE', `%${needle}%`)
      .orWhere('email', 'LIKE', `%${needle}%`)
      .orWhere('roleId', '=', `%${needle}%`)
      .select('*');
  }

  static orderBy(attribute, direction) {
    return DB(table).orderBy(attribute, direction);
  }

  static destroy(id) {
    return DB(table).where({ id }).del();
  }

  static update(id, options) {
    return DB(table).where({ id }).update(options);
  }
}

module.exports = User;