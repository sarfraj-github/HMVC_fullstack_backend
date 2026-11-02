const Model = require("./group_permission.model");
const RESPONSE = require("../response");
const { RESPONSE_MESSAGE } = require("../../../utils/constant");

const handleCreateGroupPermission = async (req, res) => {
    try {
        Model.initSchema('public');
        const response = await Model.createGroupPermission(req?.body, req?.user?.id);
        if (!response) {
            return RESPONSE.badRequest(res, "Record Creation failed");
        }
        return RESPONSE.created(res, RESPONSE_MESSAGE.CREATE, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleUpdateGroupPermission = async (req, res) => {
    try {
        Model.initSchema('public');
        const response = await Model.updateGroupPermission(req?.body, req?.params?.id, req?.user?.id);
        if (!response) {
            return RESPONSE.notFound(res, "Updation failed: record not found");
        }
        return RESPONSE.created(res, RESPONSE_MESSAGE.UPDATE, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleListOFGroupPermission = async (req, res) => {
    try {
        Model.initSchema('public');
        const response = await Model.fetchAllGroupPermission();
        if (!response) {
            return RESPONSE.notFound(res, "Record ist not found");
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleGetGroupPermission = async (req, res) => {
    try {
        Model.initSchema('public');
        const response = await Model.fetchGroupPermission(req?.params?.id);
        if (!response) {
            return RESPONSE.notFound(res, "Record not found");
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleDeleteGroupPermission = async (req, res) => {
    try {
        Model.initSchema('public');
        const response = await Model.deleteGroupPermission(req?.params?.id);
        if (!response) {
            return RESPONSE.notFound(res, "Deletion Failed: record not found");
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.DELETE, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

module.exports = {
    handleCreateGroupPermission,
    handleUpdateGroupPermission,
    handleListOFGroupPermission,
    handleGetGroupPermission,
    handleDeleteGroupPermission
}