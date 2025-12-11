const Router = require("express").Router();
const Middlewere = require("../middlewares");
const Controller = require("./group_permission.controller");

Router.get('/{:id}', Middlewere.authenticateUser, Middlewere.checkModulePermission("Permission", "view_all"), Controller.handleListOFGroupPermission);

module.exports = Router;