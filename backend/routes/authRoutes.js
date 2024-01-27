const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validationResult } = require('express-validator');
const { registerValidationRules, loginValidationRules } = require('../validation/userValidation');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/auth/register', registerValidationRules(), validate, authController.register);
router.post('/auth/login', loginValidationRules(), validate, authController.login);

module.exports = router;
