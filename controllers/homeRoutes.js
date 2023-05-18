
const router = require('express').Router();
const { Song , User, Artist } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('main', {
    layout: 'layouts/main',
  });
});



module.exports = router;
