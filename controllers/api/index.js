const router = require('express').Router();

const userRoutes = require('./user_routes.js');
const commentRoutes = require('./comment-routes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;