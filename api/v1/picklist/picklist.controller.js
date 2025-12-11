/**
 * @file picklist.contoller.js
 * @description Handles all picklist AND it's picklist_value endpoint requests.
 * @author  Modmmad Sarfraj
 * @date    10-December-2025
 */

const MODEL = require("./picklist.model");
const RESPONSE = require('../response/index');
const { RESPONSE_MESSAGE } = require("../../../utils/contant");

const handlePickListsByModuleAndName = async (req, res) => {
    try {
        MODEL.initSchema(req.user.tenentcode);
        const response = await MODEL.fetchPickListsByModuleAndName(req.params.module_id, req.params.picklist_name)
        if (!response) {
            return RESPONSE.notFound(res);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, response);
    } catch (error) {
        console.log('Error: fetch picklists:', error);
        return RESPONSE.serverError(res);
    }
}

module.exports = { handlePickListsByModuleAndName }