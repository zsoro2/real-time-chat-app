const bcrypt = require("bcryptjs");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authController = {
  /**
   * Register the user
   *
   * @param {*} req
   * @param {*} res
   */
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: hashedPassword,
          username: req.body.username,
        },
      });
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      res.status(400).json({ error: "Unable to register user" });
    }
  },

  /**
   * Login the user.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  login: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(401).json({ error: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
        });
      });
    })(req, res, next);
  },
};

module.exports = authController;
