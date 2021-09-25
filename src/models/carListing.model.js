'use strict';

const DB = require('../configs/knex');
const { v4: uuidv4 } = require('uuid');

const table = 'carsListing';

class CarListing {
  constructor(payload) {
    this.id = uuidv4();
    this.model = payload.model.toLowerCase();
    this.brand = payload.brand.toLowerCase();
    this.dayPrice = payload.dayPrice;
    this.features = payload.features.join(',').toLowerCase();
    this.location = payload.location.toLowerCase();
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
      .orWhere('location', 'LIKE', `%${needle}%`)
      .orWhere('features', 'LIKE', `%${needle}%`)
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