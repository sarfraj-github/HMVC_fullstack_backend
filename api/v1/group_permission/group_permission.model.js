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

const createGroupPermission = async (payload, group_id, user_id, client = DB) => {
    try {
        const query = `INSERT INTO ${this.schema}.group_permissions(
        group_id, module_id, "create", tab_view, update, delete, view_all, createddate, createdbyid, lastmodifiedbyid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) RETURNING *;`;

        const insertPromises = payload?.map(async (item, index) => {
            const values = [
                group_id,
                item?.module_id,
                item?.create,
                item?.tab_view || false,
                item?.update,
                item?.delete,
                item?.view_all,
                item?.owner,
                user_id || null
            ];

            const { rows } = await client.query(query, values);
            return rows[0];
        });

        const insertedRows = await Promise.all(insertPromises);
        return insertedRows;
    } catch (error) {
        throw error;
    }
}

const updateGroupPermission = async (payload, group_id, user_id, client = DB) => {
    try {
        const updatePromise = payload?.map(async (record, index) => {
            const query = `
                INSERT INTO ${this.schema}.group_permissions (group_id, module_id, create, tab_view, update, delete, view_all, lastmodifieddate, lastmodifiedbyid)
                VALUES ($1, $2, $3, $4, $5, $6, $7, now(), $8, $9)
                ON CONFLICT (group_id, module_id)
                DO UPDATE SET
                    can_create = EXCLUDED.create,
                    show_tab = EXCLUDED.tab_view,
                    can_update = EXCLUDED.update,
                    can_delete = EXCLUDED.delete,
                    view_all_records = EXCLUDED.view_all,
                    lastmodifieddate = now(),
                    lastmodifiedbyid = EXCLUDED.lastmodifiedbyid
                RETURNING *;
            `;

            const values = [
                group_id,
                record?.module_id,
                record?.create,
                record?.tab_view || false,
                record?.update,
                record?.delete,
                record?.view_all,
                user_id
            ];

            const { rows } = await client.query(query, values);
            return rows[0];
        });

        const updateRows = await Promise.all(updatePromise);
        return updateRows;

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