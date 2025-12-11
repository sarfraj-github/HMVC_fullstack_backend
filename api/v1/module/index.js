/**
 * Handle all incoming request for /api/v1/module endpoint
 * DB table use for this schema.module
 * Controller used here module.controller
 * @author            : Modmmad Sarfraj
 * @createddate       : 10-December-2025
 */

const express = require("express");
const router = express.Router();
const CONTROLLER = require("./module.controller");
const MiddleWere = require("../middlewares/index");

router.get('/', MiddleWere.authenticateUser, CONTROLLER.handleListOfModules)
router.post('/', MiddleWere.authenticateUser, CONTROLLER.handleUpsertModuel);

module.exports = router;