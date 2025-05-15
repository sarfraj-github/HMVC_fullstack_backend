const express = require('express');
const app = express();
const routes = require('./routes/router');

// Middleware
app.use(express.json());

// Mount all routes
app.use('/api/v1', routes);

module.exports = app;
