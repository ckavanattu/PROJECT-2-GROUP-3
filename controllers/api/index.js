const router = require('express').Router();

const userRoutes = require('./user_routes.js');

const apiRoutes = require('./api')

router.use('/', homeRoutes)
router.use('/users', userRoutes);

module.exports = router;