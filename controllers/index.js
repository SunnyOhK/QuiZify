const router = require('express').Router();
// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const loginRoutes = require('./loginRoutes');
// const logoutRoutes = require('./logoutRoutes');
const quizController = require('./quizController');
// const scoreRoutes = require('./resultsRoutes')


router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
// router.use('/auth/deezer', loginRoutes);
// router.use('/logout', logoutRoutes);
router.use('/quiz', quizController);
// route.use('/results', scoreRoutes)


module.exports = router;
