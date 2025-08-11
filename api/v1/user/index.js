const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authenticateUser = require("../middlewares/index");
const checkModulePermission = require("../module_permission");

router.get('/' , authenticateUser, checkModulePermission('User', 'view_all'), userController.handleGetusers);
router.get('/:id' , authenticateUser, checkModulePermission('User', 'view_all'), userController.handleGetusers);
router.post('/' , authenticateUser, checkModulePermission('User', 'create'), userController.handleCreate);
router.put('/:id' , authenticateUser, checkModulePermission('User', 'update'), userController.handleUpdate);
router.delete('/' , authenticateUser, checkModulePermission('User', 'delete'), userController.handleDelete);

module.exports = router;
