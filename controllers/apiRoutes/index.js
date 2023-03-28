const router = require('express').Router();
const { Router } = require('express');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes')

router.use('/user', userRoutes);
router.post('/post', postRoutes);

module.exports = router;
