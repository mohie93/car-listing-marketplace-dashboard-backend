'use strict';

const DB = require('../configs/knex');
const { v4: uuidv4 } = require('uuid');

const table = 'usersRoles';

class userRole {
  constructor(payload) {
    this.id = uuidv4();
    this.userId = payload.userId;
    this.roleId = payload.roleId;
  }

  save() {
    const { id, roleId, userId } = this;
    return DB(table).insert({ id, roleId, userId });
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getById(id) {
    return DB(table).where({ id }).select('*').first();
  }

  static update(id, options) {
    return DB(table).where({ id }).update(options);
  }
}

module.exports = userRole;