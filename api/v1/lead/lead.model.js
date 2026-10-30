const DB = require("../../../config/database");
const LEAD_FIELDS = require('../../../utils/constant').LEAD_FIELDS;

let schema = '';
const initSchema = (schemaName) => { this.schema = schemaName };

const getLeads = async () => {
    try {
        const query = `SELECT * FROM ${this.schema}.leads`;
        const leads = await DB.query(query);
        return leads.rows || [];
    } catch (error) {
        throw error;
    }
}

const getLeadById = async (id) => {
    try {
        const query = `SELECT * FROM ${this.schema}.leads WHERE id = $1`;
        const lead = await DB.query(query, [id]);
        return lead.rows[0] || null;
    } catch (error) {
        throw error;
    }
}

const createLead = async (data, user_id) => {
    try {
        const fields = LEAD_FIELDS.join(', ');
        const placehoders = LEAD_FIELDS.map((_, index) => `$${index + 1}`).join(', ');
        const values = LEAD_FIELDS.map((field) => {
            if (field === 'createdbyid' || field === 'lastmodifiedbyid') {
                return user_id || null;
            }
            return data[field];
        });
        const query = `INSERT INTO ${this.schema}.leads (${fields}) VALUES (${placehoders}) RETURNING *`;
        const newLead = await DB.query(query, values);
        return newLead.rows[0] || null;
    } catch (error) {
        throw error;
    }
}

const updateLeadById = async (data, user_id, record_id) => {
    try {
        data = { ...data, lastmodifiedbyid: user_id };
        const validFields = LEAD_FIELDS?.filter(field => field in data);
        const setParts = validFields?.map((key, idx) => `${key} = $${idx + 1}`) || [];
        setParts.push(`lastmodifieddate = NOW()`);

        const values = validFields?.map(key => data[key]);
        values.push(record_id);

        const query = `UPDATE ${this.schema}.leads SET ${setParts.join(', ')} WHERE id = $${values.length} RETURNING *;`;
        const { rows } = await DB.query(query, values);
        return rows[0] || null;

    } catch (error) {
        throw error;
    }
}

const deleteLeadById = async (id) => {
    try {
        const query = `DELETE FROM ${this.schema}.leads WHERE id = $1 RETURNING *;`;
        const { rows } = await DB.query(query, [id]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initSchema,
    getLeads,
    getLeadById,
    createLead,
    updateLeadById,
    deleteLeadById
}