'use strict';

require('dotenv').config({});

const { DB_PORT, DB_ENGINE, DB_HOST, DB_NAME, DB_USER_NAME, DB_USER_PASSWORD } = process.env;

const client = DB_ENGINE;

const connection = {
  host: DB_HOST,
  user: DB_USER_NAME,
  password: DB_USER_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

module.exports = {
  development: {
    client,
    connection,
    pool: { min: 0, max: 5 },
  },

  staging: {
    client,
    connection,
    pool: { min: 3, max: 5 },
  },

  production: {
    client,
    connection,
    pool: { min: 5, max: 10 },
  },
};