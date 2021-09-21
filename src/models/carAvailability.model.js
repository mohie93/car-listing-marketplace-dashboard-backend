'use strict';

const DB = require('../configs/kenx');
const { v4: uuidv4 } = require('uuid');

const table = 'carsListing';

class CarAvailability {
  constructor(payload) {
    // carId, startAt, endAt
    this.id = uuidv4();
    this.carId = payload.carId;
    this.startAt = payload.startAt;
    this.endAt = payload.endAt;
  }

  save() {
    const { id, carId, endAt, startAt } = this;
    return DB(table).insert({ id, carId, startAt, endAt});
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getById(id) {
    return DB(table).where({ id }).select('*').first();
  }

  static searchBy(needle) {
    return DB(table)
      .where('startAt', 'LIKE', `%${needle}%`)
      .orWhere('endAt', 'LIKE', `%${needle}%`)
      .orWhere('carId', '=', `%${needle}%`)
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

module.exports = CarAvailability;