const router = require('express').Router();

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session: ', err);
      res.status(500).send('Internal Server Error');
    }

    res.redirect('/');
  });
});

module.exports = router;