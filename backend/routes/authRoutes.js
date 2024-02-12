const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validationResult } = require('express-validator');
const { registerValidationRules, loginValidationRules } = require('../validation/userValidation');
const authenticated  = require("../middleware/authenticated");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/api/auth/user', authenticated, authController.user);
router.post('/api/auth/register', registerValidationRules(), validate, authController.register);
router.post('/api/auth/login', loginValidationRules(), validate, authController.login);
router.post('/api/auth/logout', authenticated, authController.logout);

module.exports = router;
