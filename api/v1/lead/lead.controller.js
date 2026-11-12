const Model = require("./lead.model");
const RESPONSE = require('../response/index');
const RESPONSE_MESSAGE = require('../../../utils/constant');

const handleGetLeads = async (req, res) => {
    try {
        Model.initSchema(req?.user?.tenantcode);
        const leads = await Model.getLeads();
        if (!leads) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, leads);
    } catch (error) {
        console.log('Server Error fetch leads : ', error);
        return RESPONSE.serverError(res);
    }
}

const handleGetLead = async (req, res) => {
    try {
        const { id } = req.params;
        Model.initSchema(req?.user?.tenantcode);
        const lead = await Model.getLeadById(id);
        if (!lead) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, lead);
    } catch (error) {
        console.log('Server Error fetch lead : ', error);
        return RESPONSE.serverError(res);
    }
}

const handleCreate = async (req, res) => {
    try {
        const data = req.body;
        // Validate required fields
        Model.initSchema(req?.user?.tenantcode);
        const newLead = await Model.createLead(data, req?.user?.id);
        if (!newLead) {
            return RESPONSE.badRequest(res, RESPONSE_MESSAGE.BAD_REQUEST);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.CREATE, newLead);
    } catch (error) {
        console.log('Server Error create lead : ', error);
        return RESPONSE.serverError(res);
    }
}

const handleUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        Model.initSchema(req?.user?.tenantcode);
        const updatedLead = await Model.updateLeadById(data, req?.user?.id, id);
        if (!updatedLead) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.UPDATE, updatedLead);
    } catch (error) {
        console.log('Server Error update lead : ', error);
        return RESPONSE.serverError(res);
    }
}

const handleDelete = async (req, res) => {
    try {
        const { id } = req.params;
        Model.initSchema(req?.user?.tenantcode);
        const deletedLead = await Model.deleteLeadById(id);
        if (!deletedLead) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.DELETE, deletedLead);
    } catch (error) {
        console.log('Server Error delete lead : ', error);
        return RESPONSE.serverError(res);
    }
}

module.exports = {
    handleGetLeads,
    handleGetLead,
    handleCreate,
    handleUpdate,
    handleDelete
}