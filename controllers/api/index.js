const router = require('express').Router();

const userRoutes = require('./user_routes.js');

router.use('/users', userRoutes);

module.exports = router;