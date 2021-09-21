'use strict';

const DB = require('../configs/knex');
const { v4: uuidv4 } = require('uuid');

const table = 'roles';

class Role {
  constructor(payload) {
    this.id = uuidv4();
    this.name = payload.name;
    this.description = payload.description;
  }

  save() {
    const { id, name, description } = this;
    return DB(table).insert({ id, name, description });
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getById(id) {
    return DB(table).where({ id }).select('*').first();
  }

  static searchBy(needle) {
    return DB(table)
      .where('name', 'LIKE', `%${needle}%`)
      .orWhere('description', 'LIKE', `%${needle}%`)
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

module.exports = Role;