const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const { verifyJWT } = require('../config/auth');

// Public read endpoints
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsReadOne);

// Protected admin endpoints (CRUD write operations)
router.post('/trips', verifyJWT, ctrlTrips.tripsAddTrip);
router.put('/trips/:tripCode', verifyJWT, ctrlTrips.tripsUpdateTrip);
router.delete('/trips/:tripCode', verifyJWT, ctrlTrips.tripsDeleteTrip);

module.exports = router;
