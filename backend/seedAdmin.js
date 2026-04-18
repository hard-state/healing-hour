require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'healingadmin' });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit();
    }

    const newAdmin = new Admin({
      username: 'healingadmin',
      password: 'adminhealing' // Will be hashed by pre-save hook
    });

    await newAdmin.save();
    console.log('Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
