const router = require('express').Router();
const userRoutes = require('./ ------ Routes');
const projectRoutes = require('./ ------ Routes');

router.use('/ ----- ', userRoutes);
router.use('/ ----- ', projectRoutes);

module.exports = router;
