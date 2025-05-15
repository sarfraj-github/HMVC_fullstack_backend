const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authenticateUser = require("../middlewares/index");

router.get('/' , authenticateUser , userController.handleGetusers);
router.get('/:id' , authenticateUser , userController.handleGetusers);
router.post('/' , authenticateUser , userController.handleCreate);
router.put('/' , authenticateUser , userController.handleUpdate);
router.delete('/' , authenticateUser , userController.handleDelete);

module.exports = router;
