const DB = require("../../../config/database");
const GROUP_MODEL = require("../group/group.model");
const GROUP_PERMISSION_MDOEL = require("../group_permission/group_permission.model");

const schema = '';
const initSchema = (schemaName) => {
    this.schema = schemaName;
}

const createGroupWithPermission = async (payload, user_id = null) => {
    try {
        await DB.query('BEGIN');
        let response = {};
        const { group, group_permission } = payload;
        // 1. Insert first group-info in public.group table, get id of new created group in varibale.
        GROUP_MODEL.initSchema(this.schema);
        const groupResult = await GROUP_MODEL.createGroup(group, user_id, DB);

        // 2. Then Insert With group_id , group_permission records in public.group_permission table.
        if (groupResult.id) {
            response.group = groupResult;
            const gpResult = await GROUP_PERMISSION_MDOEL.createGroupPermission(group_permission, groupResult?.id, user_id, DB);
            if (!gpResult) {
                throw new Error("Group Permission Insertion failed");
            }
            response.group_permissions = gpResult;
        }

        await DB.query('COMMIT');
        return response   // <<-- final response;

    } catch (error) {
        console.log('Roll-bacl due to:', error);
        await DB.query('ROLLBACK');
        throw error;
    }
}

const updateGroupWithPermission = async (payload, user_id, group_id) => {
    try {
        await DB.query('BEGIN');
        let response = {};
        const { group, group_permission } = payload;
        GROUP_MODEL.initSchema(this.schema);
        const groupResult = await GROUP_MODEL.updateGroup(group, user_id, group_id, DB);

        if (groupResult.id) {
            response.group = groupResult;
            const gpResult = await GROUP_PERMISSION_MDOEL.updateGroupPermission(group_permission, group_id, user_id, DB);
            if (!gpResult) {
                throw new Error("Group Permission updation failed");
            }
            response.group_permissions = gpResult;
        }

        await DB.query('COMMIT');
        return response

    } catch (error) {
        throw error;
    }
}

const fetchListOfGroupsPermissions = async () => {
    try {
        let query = `SELECT g.* , JSON_AGG(gp.*) AS group_permissions
                    FROM ${this.schema}.group g
                    INNER JOIN ${this.schema}.group_permissions gp
                    ORDER BY g.lastmodifieddate
                    GROUP BY g.id`;
        const { rows } = await DB.query(query);
        return rows
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initSchema,
    createGroupWithPermission,
    updateGroupWithPermission,
    fetchListOfGroupsPermissions
}