const DB = require("../../../config/database");

let schema = '';
const initSchema = (schemaName) => {
    this.schema = schemaName;
}

const fetchAllModuleList = async () => {
    try {
        const { rows } = await DB.query(`SELECT * FROM ${this.schema}.module ORDER BY sort_order ASC;`);
        return rows;
    } catch (error) {
        throw error;
    }
}

const upsertModule = async (body) => {
    try {
        let query = `INSERT INTO ${this.schema}.module (name, api_name, parent_id, type, route_path, icon_name, show_in_menu, sort_order, status, meta)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (id)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    api_name = EXCLUDED.api_name,
                    parent_id = EXCLUDED.parent_id,
                    type = EXCLUDED.type,
                    route_path = EXCLUDED.route_path,
                    icon_name = EXCLUDED.icon_name,
                    show_in_menu = EXCLUDED.show_in_menu,
                    sort_order = EXCLUDED.sort_order,
                    status = EXCLUDED.status,
                    meta = EXCLUDED.meta,
                    lastmodifieddate = now()
                RETURNING *;`;

        const values = [
            body?.name,
            body?.api_name,
            body?.parent_id,
            body?.type,
            body?.route_path,
            body?.icon_name,
            body?.show_in_menu,
            body?.sort_order,
            body?.status,
            body?.meta
        ];

        const { rows } = await client.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = { initSchema, fetchAllModuleList, upsertModule }