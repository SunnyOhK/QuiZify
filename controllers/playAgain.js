const router = require('express').Router();

router.post('/', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }

    // Redirect to the '/quiz' page
    res.redirect('/quiz');
  });
});

module.exports = router;