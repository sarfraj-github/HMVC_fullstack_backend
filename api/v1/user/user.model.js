const db = require("../../../config/database");
// import db from "../../../config/db.config.js"; <<-- This Syntax is ES6 JavaScript , we need to set {type : module} in packge.json file.

const schema = '';
const initSchema = async (schemaName) => {
    this.schema = schemaName
}

const fields = ['first_name', 'last_name', 'phone', 'mobile', 'isactive', 'email', 'password', 'gender', 'street', 'city', 'state', 'country', 'zip_code', 'department', 'maanger_id', 'company_id', 'group_id', 'description', 'createdbyid', 'lastmodifiedbyid'];

const fetchAllUsersOrById = async (id) => {
    try {
        let query = `SELECT * FROM ${this.schema}.user`;
        if (id) {
            query += ` AND id = $1`;
        }

        const { rows } = await db.query(query, id ? [id] : null);
        return rows;
    } catch (error) {
        throw error;
    }
}

const handleCreateNewUser = async (payload, user_id) => {
    try {
        payload = { ...payload, createdbyid: user_id, lastmodifiedbyid: user_id };
        const validFields = fields?.filter(field => field in payload);
        const query = `INSERT INTO ${this.schema}.user(${validFields.join(', ')})
        values(${validFields?.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *;`;

        const { rows } = await db.query(query, validFields?.map(f => payload[f]));
        return rows;

    } catch (error) {
        throw error;
    }
}

const handleUpdateUserById = async (payload, user_id, record_id) => {
    try {
        payload = {...payload, lastmodifiedbyid : user_id};
        const validFields = fields?.filter(field => field in payload);
        const setParts = validFields?.map((key, idx) => `${key} = $${idx + 1}`) || [];
        setParts.push(`lastmodifieddate = NOW()`);
        const values = validFields?.map(key => payload[key]);
        values.push(record_id);

        const query = `UPDATE ${this.schema}.user SET ${setParts.join(', ')} WHERE id = $${values.length} RETURNING *;`;
        console.log(query);

        // const {rows} = await db.query(query, values);
        // return rows[0];
    } catch (error) {
        throw error;
    }
}

const handleDeleteUserById = async (id) => {
    try {
        return {rows} = await db.query(`DELETE FROM ${this.schema}.user WHERE id = $1 RETURNING *;`, [id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initSchema,
    fetchAllUsersOrById,
    handleCreateNewUser,
    handleUpdateUserById,
    handleDeleteUserById
}