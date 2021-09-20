// What is Knex: https://knexjs.org/
'use strict';

require('dotenv').config({});

const knexConfig = require('../../knexfile');

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

module.exports = knex;