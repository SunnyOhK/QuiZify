const router = require('express').Router();

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