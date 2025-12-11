const DB = require("../../../config/database");

const schema = '';
const initSchema = (schemName) => {
    this.schema = schemName;
}

const fetchAllGroupPermission = async () => {
    try {
        const { rows } = await DB.query(`SELECT * FROM ${this.schema}.group_permission`);
        return rows || [];
    } catch (error) {
        throw error;
    }
}

const fetchGroupPermission = async (record_id) => {
    try {

    } catch (error) {
        throw error;
    }
}

const createGroupPermission = async (payload, user_id) => {
    try {

    } catch (error) {
        throw error;
    }
}

const updateGroupPermission = async (payload, record_id, user_id) => {
    try {

    } catch (error) {
        throw error;
    }
}

const deleteGroupPermission = async (record_id) => {
    try {

    } catch (error) {
        throw error;
    }
}

module.exports = {
    initSchema,
    fetchAllGroupPermission,
    fetchGroupPermission,
    createGroupPermission,
    updateGroupPermission,
    deleteGroupPermission
}