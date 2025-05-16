/**
 * Handle all incoming request for /api/v1/auth endpoint
 * DB table use for this public.users
 * Controller used here auth.controller
 * @author      Modmmad Sarfraj
 * @date        14-may-2025
 */

const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authenticateUser = require("../middlewares/index");

router.post('/signup' , authController.userRegister);
router.post('/login', authController.loginUser);
router.put('/passowrd', authenticateUser , authController.handleUpdatePassword);

module.exports = router;