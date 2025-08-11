const db = require('../../../config/database');

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

            if (!modulePerm[action]) {
                return res.status(403).json({ message: `You do not have permission to ${action} in ${moduleName}` });
            }

            next();
        } catch (error) {
            throw error
        }
    };
};

module.exports = checkModulePermission;