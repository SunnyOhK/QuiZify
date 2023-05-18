const router = require('express').Router();
const { Song , User, Artist } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  const isLoggedIn = req.query.LoggedIn === 'true';

  if (isLoggedIn) {
    res.render('layouts/main', { loggedIn: true });
    return;
  } else {
  res.render('layouts/main');
  }
});


module.exports = router;
