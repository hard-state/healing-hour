const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');

// @route   POST api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    admin.lastLogin = Date.now();
    await admin.save();

    res.json({
      success: true,
      username: admin.username,
      message: 'Login successful'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/change-password
// @desc    Change admin password
// @access  Public (In a real app, use auth middleware)
router.put('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findOne(); // Assumes only one admin
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
