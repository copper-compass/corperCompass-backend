const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await authService.registerUser(email, password, role);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
