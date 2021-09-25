'use strict';

const DB = require('../configs/knex');
const { v4: uuidv4 } = require('uuid');

const table = 'carsAvailability';

class CarAvailability {
  constructor(payload) {
    // carId, startAt, endAt
    this.id = uuidv4();
    this.carId = payload.carId.toLowerCase();
    this.startAt = payload.startAt.toLowerCase();
    this.endAt = payload.endAt.toLowerCase();
  }

  save() {
    const { id, carId, endAt, startAt } = this;
    return DB(table).insert({ id, carId, startAt, endAt});
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getByCarId(id) {
    return DB(table).where({ carId: id }).select('*');
  }

  static searchBy(needle) {
    return DB(table)
      .where('startAt', '=', needle)
      .orWhere('endAt', '=', needle)
      .orWhere('carId', '=', needle)
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