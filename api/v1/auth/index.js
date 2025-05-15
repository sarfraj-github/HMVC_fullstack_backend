const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post('/signup' , authController.userRegister);
router.post('/login', authController.loginUser);

module.exports = router;
