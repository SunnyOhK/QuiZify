const router = require('express').Router();
// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const loginRoutes = require('./loginRoutes');
// const logoutRoutes = require('./logoutRoutes');
const quizController = require('./quizController');
const songRoutes=require('./songRoutes')


router.use('/songs', songRoutes);
router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
// router.use('/auth/deezer', loginRoutes);
// router.use('/logout', logoutRoutes);
router.use('/quiz', quizController);


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

router.get('/quiz/preview', async function (req, res) {
  const artistId = req.query.artistId;
  const previewTrackUrl = await getPreviewTrackUrl(artistId);

  if (previewTrackUrl) {
    res.json({ previewTrackUrl: previewTrackUrl });
  } else {
    res.status(404).json({ message: "Preview track not found for the given artist ID." });
  }
});


module.exports = router;
