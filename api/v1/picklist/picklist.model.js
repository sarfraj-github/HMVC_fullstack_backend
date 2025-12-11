const DB = require("../../../config/database");

let schema = '';
const initSchema = (schemaName) => {
    this.schema = schemaName;
}

const fetchPickListsByModuleAndName = async (module_id = null, picklist_name = null) => {
    try {
        let query = `SELECT pl.*, JSON_AGG(plv.*) AS picklist_values 
                    FROM ${this.schema}.picklist pl
                    LEFT JOIN ${this.schema}.picklist_value plv ON plv.picklist_id = pl.id
                    WHERE pl.module_id = $1 AND pl.name = $2
                    ORDER BY plv.sort_order`;
        const { rows } = await DB.query(query, [module_id, picklist_name]);
    } catch (error) {
        throw error;
    }
}

module.exports = { initSchema, fetchPickListsByModuleAndName }