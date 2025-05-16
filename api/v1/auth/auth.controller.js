/**
 * @file auth.contoller.js
 * @description Handles all authentication endpoint requests.
 * @author  Modmmad Sarfraj
 * @date    14-may-2025
 */

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authModel = require('./auth.model');
const response = require('../response/index');
const jwtConfig = require("../../../config/db.config");

const userRegister = async (req, res) => {
    try {
        console.log('req.body-->>' , req.body);
        
        // const isExsitingUser = await authModel.findByEmail(body?.email);
        // if (isExsitingUser) {
        //     return response.error(res, 'Email already registered', 400);
        // }

        const salt = bcrypt.genSaltSync(10);
        req.body.hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await authModel.registerNewUser(req.body);
        console.log('database response after rgister new user :-> ', newUser);

        if (newUser) { 
            response.created(res, 'Record created successfully.' , newUser);
        }

    } catch (error) {
        console.log('server-error :-> ', error);
        response.serverError(res);
    }
}

const loginUser = async (req , res) => {
    try {
        const userRecord = await authModel.findByEmail(req.body.email);
        // console.log('userRecord-by-email :->' , userRecord);
        
        if (!userRecord) {
            return response.unauthorized(res);
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, userRecord.password);
        if (!isPasswordMatch) {
            return response.unauthorized(res);
        }

        delete userRecord?.password;

        const authToken = jwt.sign(userRecord, jwtConfig.jwt.JWT_SECRET, { expiresIn: jwtConfig.jwt.JWT_EXPIRE_IN });
        response.success(res , null , authToken);

    } catch (error) {
        console.log('login-server-error :->' , error);
        response.serverError(res);
    }
}

const handleUpdatePassword = async (req , res) => {
    try {
        const { password , id } = req.body;
        const salt  = bcrypt.genSaltSync(10);
        const result = await authModel.updatePassword(bcrypt.hashSync(password , salt), id);

        if (!result) {
            return response.badRequest(res , 'Password update failed');
        }

        return response.success(res , 'Password updated successfully' , result);

    } catch (error) {
        console.log('Server-error-password :->' , error);
        response.serverError(res);
    }
}

module.exports = {
    userRegister,
    loginUser,
    handleUpdatePassword,
}