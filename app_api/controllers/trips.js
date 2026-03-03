const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

const _sendJsonResponse = (res, status, content) => {
  res.status(status).json(content);
};

const _validateTripBody = (body) => {
  const tripCode = (body.tripCode || '').toString().trim();
  const name = (body.name || '').toString().trim();

  if (!tripCode) return { ok: false, message: 'tripCode is required' };
  if (!name) return { ok: false, message: 'name is required' };

  // Keep these as strings (matches existing schema & course materials)
  return {
    ok: true,
    trip: {
      tripCode,
      name,
      description: (body.description || '').toString(),
      length: (body.length || '').toString(),
      price: (body.price || '').toString(),
      image: (body.image || '').toString(),
    },
  };
};

/**
 * GET /api/trips
 * Returns a collection of all trips
 */
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean(); // Mongoose FIND criterion
    return _sendJsonResponse(res, 200, trips);
  } catch (err) {
    return _sendJsonResponse(res, 500, { message: 'Server error', error: err.message });
  }
};

/**
 * GET /api/trips/:tripCode
 * Returns one trip by tripCode
 */
const tripsReadOne = async (req, res) => {
  const { tripCode } = req.params;
  if (!tripCode) {
    return _sendJsonResponse(res, 400, { message: 'tripCode parameter is required' });
  }

  try {
    const trip = await Trip.findOne({ tripCode }).lean();
    if (!trip) {
      return _sendJsonResponse(res, 404, { message: `Trip not found for tripCode: ${tripCode}` });
    }
    return _sendJsonResponse(res, 200, trip);
  } catch (err) {
    return _sendJsonResponse(res, 500, { message: 'Server error', error: err.message });
  }
};

/**
 * POST /api/trips
 * Creates a new trip
 */
const tripsAddTrip = async (req, res) => {
  const validation = _validateTripBody(req.body || {});
  if (!validation.ok) {
    return _sendJsonResponse(res, 400, { message: validation.message });
  }

  try {
    const created = await Trip.create(validation.trip);
    return _sendJsonResponse(res, 201, created);
  } catch (err) {
    // Duplicate tripCode
    if (err && err.code === 11000) {
      return _sendJsonResponse(res, 409, { message: 'tripCode already exists' });
    }
    return _sendJsonResponse(res, 500, { message: 'Server error', error: err.message });
  }
};

/**
 * PUT /api/trips/:tripCode
 * Updates an existing trip
 */
const tripsUpdateTrip = async (req, res) => {
  const { tripCode } = req.params;
  if (!tripCode) {
    return _sendJsonResponse(res, 400, { message: 'tripCode parameter is required' });
  }

  try {
    const trip = await Trip.findOne({ tripCode });
    if (!trip) {
      return _sendJsonResponse(res, 404, { message: `Trip not found for tripCode: ${tripCode}` });
    }

    // Allow updating everything except tripCode (keep URL as source of truth)
    const body = req.body || {};
    if (typeof body.name === 'string') trip.name = body.name;
    if (typeof body.description === 'string') trip.description = body.description;
    if (typeof body.length === 'string') trip.length = body.length;
    if (typeof body.price === 'string') trip.price = body.price;
    if (typeof body.image === 'string') trip.image = body.image;

    const saved = await trip.save();
    return _sendJsonResponse(res, 200, saved);
  } catch (err) {
    return _sendJsonResponse(res, 500, { message: 'Server error', error: err.message });
  }
};

/**
 * DELETE /api/trips/:tripCode
 * Deletes an existing trip
 */
const tripsDeleteTrip = async (req, res) => {
  const { tripCode } = req.params;
  if (!tripCode) {
    return _sendJsonResponse(res, 400, { message: 'tripCode parameter is required' });
  }

  try {
    const deleted = await Trip.findOneAndDelete({ tripCode }).lean();
    if (!deleted) {
      return _sendJsonResponse(res, 404, { message: `Trip not found for tripCode: ${tripCode}` });
    }
    // Return a JSON payload to keep Angular/Postman behavior consistent
    return _sendJsonResponse(res, 200, { message: 'deleted', tripCode: deleted.tripCode });
  } catch (err) {
    return _sendJsonResponse(res, 500, { message: 'Server error', error: err.message });
  }
};

module.exports = {
  tripsList,
  tripsReadOne,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};
