const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  preferredDate: {
    type: String,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  massageType: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  preferredTherapist: {
    type: String
  },
  hadMassageBefore: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
