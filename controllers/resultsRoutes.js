const router = require('express').Router();
const { Song } = require('../models');
const { Op } = require('sequelize');


router.get('/results', (req, res) => {
  res.render('results', { layout: 'gameboard-layout', songs: playedSongs });
});

module.exports = router;