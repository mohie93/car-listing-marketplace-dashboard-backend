'use strict';

const DB = require('../configs/knex');

const table = 'usersTags';
const tagsTable = 'tags';
const usersTable = 'users';

class UserTag {
  constructor(payload) {
    this.userId = payload.userId;
    this.tagId = payload.tagId;
  }

  save() {
    const { tagId, userId } = this;
    return DB(table).insert({ tagId, userId });
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getBy(id, type) {
    switch (type) {
      case 'tag':
        return this.getByTagId(id);
      case 'user':
        return this.getByUserId(id);
    }
  }

  static getByTagId(tagId) {
    return DB(table).where({ tagId }).join('users', 'userId', 'users.id').select('*');
  }

  static getByUserId(userId) {
    return DB(table).where({ userId }).join('tags', 'tagId', 'tags.id').select('*');
  }

  static searchBy(needle, type) {
    switch (type) {
      case 'tag':
        return this.searchByTag(needle);
      case 'user':
        return this.searchByUser(needle);
    }
  }

  static searchByTag(needle) {
    return DB(tagsTable).where('name', 'LIKE', `%${needle}%`)
      .rightJoin('usersTags', 'tagId', 'tags.id')
      .leftJoin('users', 'userId', 'users.id').select('*')
  }

  static searchByUser(needle) {
    return DB(usersTable).where('firstName', 'LIKE', `%${needle}%`)
      .orWhere('lastName', 'LIKE', `%${needle}%`)
      .orWhere('email', 'LIKE', `%${needle}%`)
      .leftJoin('usersTags', 'userId', 'users.id')
      .rightJoin('tags', 'tagId', 'tags.id').select('*')
  }

  static destroy(id) {
    return DB(table).where({ id }).del();
  }
}

module.exports = UserTag;