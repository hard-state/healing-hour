const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// @route   POST api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
  const {
    fullName, email, phone, preferredDate, preferredTime,
    location, massageType, duration, preferredTherapist,
    hadMassageBefore, message
  } = req.body;

  try {
    const newContact = new Contact({
      fullName, email, phone, preferredDate, preferredTime,
      location, massageType, duration, preferredTherapist,
      hadMassageBefore, message
    });

    const contact = await newContact.save();

    // Send Email Notification
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_YOUR_KEY_HERE') {
      try {
        await resend.emails.send({
          from: 'Healing Massage <onboarding@resend.dev>', // Use verified domain in production
          to: process.env.EMAIL_TO || 'your-email@example.com',
          subject: `New Massage Booking: ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #d4af37; text-align: center;">New Booking Received</h2>
              <hr style="border: 0; border-top: 1px solid #eee;" />
              <p><strong>Client:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service:</strong> ${massageType} (${duration})</p>
              <p><strong>Preferred Date:</strong> ${preferredDate} at ${preferredTime}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Therapist:</strong> ${preferredTherapist || 'Any'}</p>
              <p><strong>First Timer:</strong> ${hadMassageBefore ? 'No' : 'Yes'}</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
                <strong>Message:</strong><br/>
                ${message || 'No additional notes provided.'}
              </div>
            </div>
          `
        });
        console.log('Email sent successfully');
      } catch (emailErr) {
        console.error('Failed to send email:', emailErr);
      }
    }

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
