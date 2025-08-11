const router = require('express').Router();

const authRoutes = require('../api/v1/auth');
const userRoutes = require('../api/v1/user');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
