const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  avatar: String,
  bio: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
