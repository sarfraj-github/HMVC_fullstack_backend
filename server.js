const express = require('express');
const application = express();
const Routers = require('./routes/router');
const cors = require("cors");

application.use(cors())
application.use(express.json());

application.use('/api/v1', Routers);

module.exports = application;