const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    tripCode: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    length: { type: String, default: '' },
    price: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
