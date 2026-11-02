const express = require("express");
const router = express.Router();
const LeadController = require("./lead.controller");
const MiddleWere = require("../middlewares/index");

router.get('/', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('Lead', 'view_all'), LeadController.handleGetLeads);
router.get('/:id', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('Lead', 'view_all'), LeadController.handleGetLead);
router.post('/', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('Lead', 'create'), LeadController.handleCreate);
router.put('/:id', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('Lead', 'update'), LeadController.handleUpdate);
router.delete('/', MiddleWere.authenticateUser, MiddleWere.checkModulePermission('Lead', 'delete'), LeadController.handleDelete);

module.exports = router;
