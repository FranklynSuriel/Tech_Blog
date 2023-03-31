const router = require('express').Router();
const { Router } = require('express');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);

module.exports = router;
