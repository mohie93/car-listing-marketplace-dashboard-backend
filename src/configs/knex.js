// What is Knex: https://knexjs.org/
'use strict';

require('dotenv').config({});

const knexConfig = require('../../knexfile');

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

knex.raw('SELECT 1')
  .then(() => {
    console.log('Connected to database successfully!');
  })
  .catch((e) => {
    console.log('database not connected');
    console.error(e);
    process.exit(1);
  });

module.exports = knex;