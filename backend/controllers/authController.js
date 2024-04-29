const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const generateToken = require("../utils/generateToken");

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

      const token = generateToken(user.id, user.email);

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // 1h
      });

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: token,
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
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user.id, user.email);

        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000), // 1h
        });

        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          token: token,
        });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },

  /**
   * Get the authenticated user's data.
   *
   * @param {*} req
   * @param {*} res
   */
  user: async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) throw new Error("User not found");

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        nickname: user.nickname
      });
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message || "User is not authenticated" });
    }
  },
  /**
   * Logout the user.
   *
   * @param {*} req
   * @param {*} res
   */
  logout: async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
      });

      res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      res.status(500).json({ error: "Logout failed" });
    }
  },
};

module.exports = authController;
