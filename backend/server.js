const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Admin = require('./models/Admin');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/healthy';

// Connect to MongoDB
mongoose
  .connect(db)
  .then(async () => {
    console.log('MongoDB Connected...');
    
    // Auto-seed admin if database is empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        username: 'healingadmin',
        password: 'adminhealing'
      });
      await defaultAdmin.save();
      console.log('Default admin created successfully!');
    }
  })
  .catch(err => console.log(err));

// Use Routes
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/hero', require('./routes/api/hero'));
app.use('/api/admin', require('./routes/api/admin'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
