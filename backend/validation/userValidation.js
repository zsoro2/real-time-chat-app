const { body } = require("express-validator");

const registerValidationRules = () => {
  return [
    body("username", "Username is required").notEmpty(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ];
};

const loginValidationRules = () => {
  return [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").notEmpty(),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
