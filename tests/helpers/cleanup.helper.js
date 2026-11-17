const DB_INSTANCE = require('../config/database');

const cleanupDatabase = async (testUsersIds = []) => {
    try {
        if (!testUsersIds.length > 0) return;
        await DB_INSTANCE.query(`DELETE FROM public.user WHERE id = ANY($1::uuid[])`, [testUsersIds]);
    } catch (error) {
        console.error('Database Cleanup Failed:', error);
        throw error;
    }
};


module.exports = { cleanupDatabase };