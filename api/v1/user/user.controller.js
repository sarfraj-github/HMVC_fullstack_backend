const userModel = require("./user.model");
const response = require('../response/index');

const handleGetusers = async (req , res) => {
    try {
        const usersRecords = await userModel.fetchAllUsersOrById(req?.params?.id) 
        console.log("usersRecords-->>" , usersRecords);
        return response.success(res , 'Record received successfully', usersRecords);
        
    } catch (error) {
        console.log('Error-fetchUsers :' , error);
        return response.serverError(res);
    }
}

const handleCreate = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}

const handleUpdate = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}

const handleDelete = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    handleGetusers,
    handleCreate,
    handleUpdate,
    handleDelete
}
