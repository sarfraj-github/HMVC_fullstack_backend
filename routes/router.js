const router = require('express').Router();

const authRoutes = require('../api/v1/auth');
const userRoutes = require('../api/v1/user');
const modules = require("../api/v1/module");
const global = require("../api/v1/global");
const group_permission = require('../api/v1/group_permission');
const picklist = require("../api/v1/picklist");

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/module', modules);
router.use('/global', global);
router.use('/group-permission', group_permission);
router.use('/picklist', picklist);

module.exports = router;
