const db = require("../../../config/database");

const fetchAllUsersOrById = async (id) => {
    let query = `SELECT * FROM public.users WHERE isactive = true`;
    if (id) {
        query += ` AND id = $1`;
    }

    const result = await db.query(query , id ? [id] : null);
    return result.rows;
}

const handleCreateNewUser = async (userObject , id) => {
    
}

const handleUpdateUserById = async (userObject , id) => {
    
}

const handleDeleteUserById = async (id) => {
    
}

module.exports = {
    fetchAllUsersOrById,
    handleCreateNewUser,
    handleUpdateUserById,
    handleDeleteUserById
}