'use strict';

const DB = require('../configs/kenx');
const { v4: uuidv4 } = require('uuid');

const table = 'carsListing';

class CarListing {
  constructor(payload) {
    this.id = uuidv4();
    this.model = payload.model;
    this.brand = payload.brand;
    this.dayPrice = payload.dayPrice;
    this.features = payload.features;
    this.location = payload.location;
  }

  save() {
    const { id, model, brand, dayPrice, features, location } = this;
    return DB(table).insert({ id, model, brand, dayPrice, features, location });
  }

  static getAll() {
    return DB(table).select('*');
  }

  static getById(id) {
    return DB(table).where({ id }).select('*').first();
  }

  static searchBy(needle) {
    return DB(table)
      .where('model', 'LIKE', `%${needle}%`)
      .orWhere('brand', 'LIKE', `%${needle}%`)
      .orWhere('dayPrice', 'LIKE', `%${needle}%`)
      .orWhere('dayPrice', 'LIKE', `%${needle}%`)
      .orWhere('features', 'LIKE', `%${needle}%`)
      .orWhere('location', 'LIKE', `%${needle}%`)
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

module.exports = CarListing;