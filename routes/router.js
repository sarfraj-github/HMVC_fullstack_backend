// const express = require('express');
const router = require('express').Router();

const userRoutes = require('../api/v1/user');
const authRoutes = require('../api/v1/auth');

router.use('/user', userRoutes);
router.use('/auth', authRoutes); // /api/v1/auth

module.exports = router;
