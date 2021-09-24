'use strict';

const DB = require('../configs/knex');
const { v4: uuidv4 } = require('uuid');

const table = 'usersTags';

class UserTag {
  constructor(payload) {
    this.id = uuidv4();
    this.userId = payload.userId;
    this.tagId = payload.tagId;
  }

  save() {
    const { id, tagId, userId } = this;
    return DB(table).insert({ id, tagId, userId });
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

  static searchBy(needle) {
    return DB(table)
      .where('tagId', '=', `%${needle}%`)
      .orWhere('userId', '=', `%${needle}%`)
      .select('*');
  }

  static destroy(id) {
    return DB(table).where({ id }).del();
  }
}

module.exports = UserTag;