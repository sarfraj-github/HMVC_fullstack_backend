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
const MiddleWere = require("../middlewares/index");

router.post('/signup' , authController.userRegister);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logout);
router.post('/passowrd', MiddleWere.authenticateUser , authController.handleUpdatePassword);

module.exports = router;