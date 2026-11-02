const UserModel = require("./user.model");
const RESPONSE = require('../response/index');
const { RESPONSE_MESSAGE } = require('../../../utils/constant');

const handleGetusers = async (req, res) => {
    try {
        UserModel.initSchema('public');
        const usersRecords = await UserModel.fetchAllUsersOrById(req?.params?.id)
        if (!usersRecords) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, usersRecords);

    } catch (error) {
        console.log('Error-fetchUsers :', error);
        return RESPONSE.serverError(res);
    }
}

const handleCreate = async (req, res) => {
    try {
        UserModel.initSchema('public');
        const response = await UserModel.handleCreateNewUser(req.body, req?.user?.id);
        if (!response) {
            return RESPONSE.badRequest(res, RESPONSE_MESSAGE.BAD_REQUEST);
        }
        return RESPONSE.created(res, RESPONSE_MESSAGE.CREATE, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleUpdate = async (req, res) => {
    try {
        const response = await UserModel.handleUpdateUserById(req?.body, req?.user?.id, req?.params?.id);
        if (!response) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.created(res, RESPONSE_MESSAGE.UPDATE, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleDelete = async (req, res) => {
    try {
        const response = await UserModel.handleDeleteUserById(req?.params?.id);
        if (!response) {
            return RESPONSE.notFound(res, RESPONSE_MESSAGE.NOT_FOUND);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.DELETE, response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

module.exports = {
    handleGetusers,
    handleCreate,
    handleUpdate,
    handleDelete
}