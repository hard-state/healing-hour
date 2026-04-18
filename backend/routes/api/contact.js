const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');

// @route   POST api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      location: req.body.location,
      massageType: req.body.massageType,
      duration: req.body.duration,
      preferredTherapist: req.body.preferredTherapist,
      hadMassageBefore: req.body.hadMassageBefore,
      message: req.body.message
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/contact
// @desc    Get all contact submissions
// @access  Private (In a real app, you'd add auth middleware here)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
