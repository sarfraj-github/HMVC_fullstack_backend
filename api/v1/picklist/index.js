/**
 * Handle all incoming request for /api/v1/picklist endpoint
 * DB table use for this schema.picklist AND schema.picklist_value
 * Controller used here picklist.controller
 * @author      Modmmad Sarfraj
 * @date        10-December-2025
 */

const express = require("express");
const router = express.Router();
const CONTROLLER = require("./picklist.controller");
const MiddleWere = require("../middlewares/index");

router.get('/with-values/:module_id/:picklist_name', MiddleWere.authenticateUser, CONTROLLER.handlePickListsByModuleAndName)

module.exports = router;