const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// App Init
const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 Ensure /uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('/uploads folder created');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Passport config
require('./config/passport');
app.use(passport.initialize());

// Routes
const flowerRoutes = require('./routes/flowerRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/flowers', flowerRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
