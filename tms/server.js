'use strict';

require('dotenv').config();
require('./config/database')();

const express = require('express');
const bparser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

/**
 * Config
 */
const { appConfig, corsConfig } = require('./config/app');

/**
 * Middlewares
 */
app.use(cors({ origin: corsConfig.origin }));
app.use(bparser.json());
app.use(bparser.urlencoded({ extended: false }));

/**
 * Routes
 */
app.use(`${appConfig.context}/api`, router);

require('./routes/auth/user.route')(router);
require('./routes/auth/auth.route')(router);
require('./routes/shipping/trunk.route')(router);
require('./routes/shipping/pilot.route')(router);
require('./routes/shipping/package.route')(router);
require('./routes/shipping/shipping.route')(router);
require('./routes/common/location.route')(router);

/**
 * Start
 */
app.listen(appConfig.port);

// Not found
app.use((req, res, next) => next({ statusCode: 404, message: '' }));

// Error Handler
app.use((err, req, res, next) => {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});
