const DB = require("../../../config/database");

const schema = '';
const initSchema = (schemaName) => {
    this.schema = schemaName;
}

const fetchAllGroups = async () => {
    try {
        const query = `SELECT * FROM ${this.schema}.group ORDER BY name`;
        const { rows } = await DB.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

const createGroup = async (body, login_user_id, client = DB) => {
    try {
        const query = `INSERT INTO ${this.schema}.group(name, status, description, createdbyid, lastmodifiedbyid)
            VALUES ($1, $2, $3, $4, $4) RETURNING *;`;

        const values = [
            body?.group_name,
            body?.status || 'Inactive',
            body?.description || null,
            login_user_id || null
        ];

        const { rows } = await client.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

const updateGroup = async (body, login_user_id, record_id, client = DB) => {
    try {
        const query = `UPDATE ${this.schema}.group
        SET name = $2, status = $3, description = $4, lastmodifiedbyid = $5, lastmodifieddate = now()
        WHERE id = $1 RETURNING *;`;

        const values = [
            record_id,
            body?.group_name,
            body?.status || null,
            body?.description || null,
            login_user_id
        ];

        const { rows } = await client.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initSchema,
    createGroup,
    updateGroup,
    fetchAllGroups
}