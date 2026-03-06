const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (email, password, role = 'user') => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');
  const user = await User.create({ email, password, role });
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  };
};

module.exports = { registerUser, loginUser };
