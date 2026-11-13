const DB_INSTANCE = require('../config/database');
const { TEST_EMAIL } = require('../../utils/constant');

const createTestUser = async (userData = {}) => {
    try {
        const user = {
            first_name: userData.first_name || 'Test',
            last_name: userData.last_name || 'User',
            email: userData.email || TEST_EMAIL,
            password: userData.password || 'password123'
        };

        const result = await DB_INSTANCE.query(
            `INSERT INTO public.user (first_name, last_name, email, password)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [user.first_name, user.last_name, user.email, user.password]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Test User Creation Failed:', error);
        throw error;
    }
};

module.exports = { createTestUser };