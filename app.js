'use strict';

// Load ENV
require('dotenv').config({});

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // for CORS
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = process.env.PORT || 5000;

// check server status
app.get('/', (_, res) =>
  res.status(200).json({
    message: 'OK',
    version: require('./package.json').version,
  }),
);

// routes
app.use('/api/v1/users', require('./src/routes/users.routes'));
app.use('/api/v1/users_tags', require('./src/routes/usersTags.routes'));
app.use('/api/v1/tags', require('./src/routes/tags.routes'));
app.use('/api/v1/roles', require('./src/routes/roles.routes'));
app.use('/api/v1/cars_listings', require('./src/routes/carsListing.routes'));
app.use('/api/v1/cars_availabilities', require('./src/routes/carsAvailability.routes'));

app.listen(port, () => console.log(`Car Listing Marketplace Dashboard Backend Running on port ${port}!`));
