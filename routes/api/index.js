const router = require('express').Router();
const usersRoutes = require('./courseRoutes');
const thoughtsRoutes = require('./studentRoutes');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;