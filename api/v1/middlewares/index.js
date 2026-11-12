const jwt = require("jsonwebtoken");
// const Auth = require("../auth/auth.model");
const jwtConfig = require("../../../config/db.config");
const db = require("../../../config/database");
const ResponseManager = require("../response");

const authenticateUser = async (request, response, next) => {
    const authHeader = request.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        return ResponseManager.unauthorized(response, 'Authentication token required');
    }

    try {
        const decodedToken = jwt.verify(token, jwtConfig.jwt.JWT_SECRET);
        // console.log('decodedToken-->>', decodedToken);

        // request.user = decodedToken.user;
        request.user = decodedToken;

        const { rows } = await db.query('SELECT id FROM public.user WHERE id = $1', [decodedToken.id]);

        if (rows.length === 0) {
            return ResponseManager.unauthorized(response, 'User account not found');
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return ResponseManager.unauthorized(response, 'Session expired. Please log in again');
        }

        return ResponseManager.unauthorized(response, 'Invalid authentication token');
    }
};

/**
 * @description : This method check a API's particuler route(GET, POST, PUT, DELETE) Permission.
 */
const checkModulePermission = (moduleName, action) => {

    const validActions = ['create', 'update', 'delete', 'view_all', 'tab_view'];

    return async (req, res, next) => {
        try {
            const user = req.user;
            const { rows } = await db.query(`
                SELECT gp.*, m.name AS module FROM public.group_permission gp
                INNER JOIN public.module m ON m.id = gp.module_id
                WHERE group_id = $1`,
                [req.user?.group_id]
            );

            if (!user || !Array.isArray(rows)) {
                return res.status(403).json({ message: 'Permissions not found for user' });
            }

            if (!validActions.includes(action)) {
                return res.status(400).json({ message: `Invalid permission action: ${action}` });
            }

            const modulePerm = rows?.find(p => p.module === moduleName);
            if (!modulePerm) {
                return res.status(403).json({ message: `No access to module: ${moduleName}` });
            }

            if (typeof modulePerm[action] !== 'boolean') {
                return res.status(403).json({ message: `Invalid or missing permission flag: ${action}` });
            }

            // Loged-in user must be has this Permission('tab_view'), if any other permissions they have.
            if (!modulePerm['tab_view']) {
                return res.status(403).json({ message: `You don't have permission to access the ${moduleName} module.` });
            }

            if (!modulePerm[action]) {
                return res.status(403).json({ message: `You do not have permission to ${action} in ${moduleName}` });
            }

            next();
        } catch (error) {
            throw error
        }
    };
};

module.exports = { authenticateUser, checkModulePermission };