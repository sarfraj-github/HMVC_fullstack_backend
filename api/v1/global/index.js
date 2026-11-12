/**
 * Handle all incoming request for /api/v1/picklist endpoint
 * Controller used here global.controller
 * @author          : Modmmad Sarfraj
 * @createddate     : 10-December-2025
 */

const express = require("express");
const router = express.Router();
const CONTROLLER = require("./global.controller");
const MiddleWere = require("../middlewares/index");

router.post('/group-permission', MiddleWere.authenticateUser, CONTROLLER.handleCreatePermission);
router.put('/group-permission/:id', MiddleWere.authenticateUser, CONTROLLER.handleUpdatePermission);

router.get('/module-list', MiddleWere.authenticateUser, CONTROLLER.handleListOfGroup);

module.exports = router;