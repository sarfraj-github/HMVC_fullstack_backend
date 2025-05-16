const db = require("../../../config/database");

const registerNewUser = async (body) => {    
  // lastmodifieddata , lastmodifiedbyid , description <<-- these fields containe null for right now.
  let query = `INSERT INTO public.users(fullname, email, phone, password, isactive, role_id, company_id, createdbyid)
    VALUES($1 , $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  const values = [
    body?.fullname,
    body?.email,
    body?.phone,
    body?.hashPassword,
    body?.isactive,
    body?.role_id,
    body?.company_id,
    body?.user_id,
  ];

  const dbResponse = await db.query(query , values);
  console.log('dbResponse-->>' , dbResponse);
  
  return dbResponse.rows[0];
};

const findByEmail = async (email) => {
  const query = `SELECT * FROM user_with_company_and_role_VIEW WHERE email = $1 AND isactive = true`;
  const findUserResponse = await db.query(query , [email]);
  return findUserResponse.rows[0];
}

const updatePassword = async (password , id) => {
  const updateQuery = `UPDATE public.users SET password = $1 WHERE id = $2 RETURNING *`;
  const {rows} = await db.query(updateQuery , [password , id]);
  return rows;
}

module.exports = {
  registerNewUser,
  findByEmail,
  updatePassword
}