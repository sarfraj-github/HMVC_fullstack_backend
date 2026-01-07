const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const MiddleWere = require("../middlewares/index");

router.get('/', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('User', 'view_all'), userController.handleGetusers);
router.get('/:id', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('User', 'view_all'), userController.handleGetusers);
router.post('/', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('User', 'create'), userController.handleCreate);
router.put('/:id', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('User', 'update'), userController.handleUpdate);
router.delete('/', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('User', 'delete'), userController.handleDelete);

module.exports = router;
