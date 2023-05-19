const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const quizController = require('./quizController');
const songRoutes=require('./songRoutes')
const playAgain = require('./playAgain');



router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/quiz', quizController);
router.use('/songs', songRoutes);
router.use('/play-again', playAgain);


router.get('/results', async (req, res) => {
  try {
    const score = req.session.score || 0;

    res.render('results', {
      layout: 'gameboard-layout',
      score,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting score');
  }
});




module.exports = router;
