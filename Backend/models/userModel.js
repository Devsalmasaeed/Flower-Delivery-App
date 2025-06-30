const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Signup static method
userSchema.statics.signup = async function(email, password) {
  const exists = await this.findOne({ email });
  if (exists) throw Error('Email already in use');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// Login static method
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error('Incorrect email');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error('Incorrect password');

  return user;
};

module.exports = mongoose.model('User', userSchema);
