const MODEL = require("./module.model");
const RESPONSE = require("../response");
const { RESPONSE_MESSAGE } = require("../../../utils/constant");

const handleListOfModules = async (req, res) => {
    try {
        MODEL.initSchema('public');
        const response = await MODEL.fetchAllModuleList();
        if (!response) {
            return RESPONSE.notFound(res);
        }
        return RESPONSE.success(res, RESPONSE_MESSAGE.SUCCESS, response);
    } catch (error) {
        console.error('Error: fetch module error:', error);
        return RESPONSE.serverError(res);
    }
}

const handleUpsertModuel = async (req, res) => {
    try {
        MODEL.initSchema('public');
        const response = await MODEL.upsertModule(req.body);
        if (!response) {
            return RESPONSE.notFound(res);
        }

        return RESPONSE.success(res,
            req.body?.id ? RESPONSE_MESSAGE.UPDATE : RESPONSE_MESSAGE.CREATE,
            response);
    } catch (error) {
        console.error('Error: fetch module error:', error);
        return RESPONSE.serverError(res);
    }
}

module.exports = { handleListOfModules, handleUpsertModuel }