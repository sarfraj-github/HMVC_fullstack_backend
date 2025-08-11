const db = require("../../../config/database");

const registerNewUser = async (body) => {
  try {
    let query = `INSERT INTO public.user(first_name, last_name, phone, mobile, isactive, email, password, gender, street, city, state, country, zip_code, department, description, company_id, group_id)
    VALUES($1 , $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`;

    const values = [
      body?.first_name,
      body?.last_name,
      body?.phone,
      body?.mobile,
      body?.isactive,
      body?.email,
      body?.hashPassword,
      body?.gender,
      body?.street,
      body?.city,
      body?.state,
      body?.country,
      body?.zip_code,
      body?.department,
      body?.description,
      body?.company_id,
      body?.group_id,
    ];

    const { rows } = await db.query(query, values);
    return rows;

  } catch (error) {
    throw error;
  }
};

const findByEmail = async (email) => {
  try {
    const query = `SELECT * FROM public.user WHERE email = $1;`;
    const { rows } = await db.query(query, [email]);
    return rows[0];

  } catch (error) {
    throw error;
  }
}

/**
 * @description : This method is fired user update password query.
 */
const updatePassword = async (password, id) => {
  try {
    const updateQuery = `UPDATE public.users SET password = $1 WHERE id = $2 RETURNING *`;
    const { rows } = await db.query(updateQuery, [password, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerNewUser,
  findByEmail,
  updatePassword
}