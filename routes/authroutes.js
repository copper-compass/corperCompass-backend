const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validate, registerValidation, loginValidation } = require('../middleware/validationMiddleware');

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);

module.exports = router;
