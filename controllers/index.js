const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const artistRoutes = require('./artistRoutes');


router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/auth/deezer', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/artist', artistRoutes);


module.exports = router;
