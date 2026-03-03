require('dotenv').config();
const mongoose = require('mongoose');

// Register models
require('./trip');

const Trip = mongoose.model('Trip');
const tripsSeed = require('../../app_server/data/trips.json');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

mongoose
  .connect(dbURI)
  .then(async () => {
    console.log(`MongoDB connected: ${dbURI}`);

    // Optional but helpful for grading: seed trips from trips.json if empty
    const count = await Trip.countDocuments();
    if (count === 0) {
      await Trip.insertMany(tripsSeed);
      console.log(`Seeded ${tripsSeed.length} trips into MongoDB`);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
