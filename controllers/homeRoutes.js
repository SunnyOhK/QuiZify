const express = require('express');
const router = require('express').Router();
const quizController = require('../controllers/quizController');

// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('layouts/main');
});

router.get('/quiz', quizController);


module.exports = router;
