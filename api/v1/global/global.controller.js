const MODEL = require("./global.model");
const RESPONSE = require("../response");
const { RESPONSE_MESSAGE } = require("../../../utils/constant");

const handleCreatePermission = async (req, res) => {
    try {
        MODEL.initSchema('public');
        const response = await MODEL.createGroupWithPermission(req.body, req.user?.id);
        if (!response) {
            return RESPONSE.noContent(res);
        }
        return RESPONSE.created(res, RESPONSE_MESSAGE.CREATE, response);
    } catch (error) {
        console.log('Error: create group permission', error);
        return RESPONSE.serverError(res);
    }
}

const handleUpdatePermission = async (req, res) => {
    try {
        MODEL.initSchema('public');
        const response = await MODEL.updateGroupWithPermission(req.body, req.user?.id, req.params?.id);
        if (!response) {
            return RESPONSE.noContent(res);
        }
        return RESPONSE.created(res, RESPONSE_MESSAGE.CREATE, response);
    } catch (error) {
        console.log('Error: update group permission', error);
        return RESPONSE.serverError(res);
    }
}

const handleListOfGroup = async (req, res) => {
    try {
        MODEL.initSchema('public');
        const response = await MODEL.fetchListOfGroupsPermissions();
        if (!response) {
            return RESPONSE.noContent(res);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, response);
    } catch (error) {
        console.log('Error: fetching group-list', error);
        return RESPONSE.serverError(res);
    }
}

module.exports = {
    handleCreatePermission,
    handleUpdatePermission,
    handleListOfGroup
};