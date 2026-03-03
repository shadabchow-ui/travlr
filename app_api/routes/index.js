const express = require('express');
const router = express.Router();

const authRoutes = require('./authentication');
const tripsRoutes = require('./trips');

router.use('/', authRoutes);
router.use('/', tripsRoutes);

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'travlr app_api' });
});

module.exports = router;
