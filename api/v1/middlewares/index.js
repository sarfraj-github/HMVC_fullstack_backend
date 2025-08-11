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
        // console.log('decodedToken-->>' , decodedToken);
        
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

module.exports = authenticateUser;