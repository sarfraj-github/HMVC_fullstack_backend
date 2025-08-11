const UserModel = require("./user.model");
const RESPONSE = require('../response/index');

const handleGetusers = async (req, res) => {
    try {
        UserModel.initSchema('public')
        const usersRecords = await UserModel.fetchAllUsersOrById(req?.params?.id)
        if (!usersRecords) {
            return RESPONSE.notFound(res, "User record list not found");
        }
        return RESPONSE.success(res, 'Record received successfully', usersRecords);

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
            return RESPONSE.badRequest(res, "User Creation failed");
        }
        return RESPONSE.created(res, "Record created successfully", response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(res);
    }
}

const handleUpdate = async (req, res) => {
    try {
        const response = await UserModel.handleUpdateUserById(req?.body, req?.user?.id, req?.params?.id);
        if (!response) {
            return RESPONSE.notFound(res, "User updation failed: record not found");
        }
        return RESPONSE.created(res, "Record updated successfully", response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(error);
    }
}

const handleDelete = async (req, res) => {
    try {
        const response = await UserModel.handleDeleteUserById(req?.params?.id);
        if (!response) {
            return RESPONSE.notFound(res, "User deletion failed: record not found");
        }
        return RESPONSE.success(res, "Record deleted successfully", response);
    } catch (error) {
        console.log('server error :', error);
        return RESPONSE.serverError(error);
    }
}

module.exports = {
    handleGetusers,
    handleCreate,
    handleUpdate,
    handleDelete
}
