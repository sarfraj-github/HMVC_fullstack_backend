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

        const isExsitingUser = await authModel.findByEmail(req?.body?.email);
        if (isExsitingUser) {
            return response.duplicate(res, 'Email already registered', 400);
        }

        const salt = bcrypt.genSaltSync(10);
        req.body.hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await authModel.registerNewUser(req.body);
        // console.log('database response after rgister new user :-> ', newUser);

        if (newUser) {
            response.created(res, 'Record created successfully.', newUser);
        }

    } catch (error) {
        console.log('server-error :-> ', error);
        response.serverError(res);
    }
}

const loginUser = async (req, res) => {
    try {
        const userRecord = await authModel.findByEmail(req.body?.username);
        // console.log('userRecord-by-username :->' , userRecord);

        if (!userRecord) {
            return response.unauthorized(res);
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, userRecord.password);
        if (!isPasswordMatch) {
            return response.unauthorized(res);
        }

        delete userRecord?.password;

        const authToken = jwt.sign(userRecord, jwtConfig.jwt.JWT_SECRET, { expiresIn: jwtConfig.jwt.JWT_EXPIRE_IN });
        return response.success(res, null, { authToken });

    } catch (error) {
        console.log('login-server-error :->', error);
        return response.serverError(res);
    }
}

const logout = async (req, res) => {
    try {

    } catch (error) {
        return Response.serverError(res);
    }
}

/**
 * @description : This Controller used for loged-in user for update password.
 */
const handleUpdatePassword = async (req, res) => {
    try {
        const { password, id } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const result = await authModel.updatePassword(bcrypt.hashSync(password, salt), id);

        delete result[0]?.password;
        if (!result) {
            return response.badRequest(res, 'Password update failed');
        }

        return response.success(res, 'Password updated successfully', result);

    } catch (error) {
        console.log('Server-error-password :->', error);
        response.serverError(res);
    }
}

/**
 * @description : This mehthod sent a reset password link to use on thier email-id
 */
const forgote_password = async (req, res) => {
    try {

    } catch (error) {
        return Response.serverError(res);
    }
}

module.exports = {
    userRegister,
    loginUser,
    logout,
    handleUpdatePassword,
}