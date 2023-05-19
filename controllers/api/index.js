const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');

router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
