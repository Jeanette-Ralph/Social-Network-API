const router = require('express').Router();
const usersRoutes = require('./courseRoutes');
const thoughtsRoutes = require('./studentRoutes');
const friendsRoutes = require('./friendstRoutes');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;