
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = "pushuismypetdogandheisvrysweet$#";
const bcrypt = require('bcryptjs');

//  Create User Route
router.post("/createUser",
  [
    body('email', 'Email must be in correct format').isEmail(),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('password', 'Password should be at least 6 characters long').isLength({ min: 6 })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Login User Route
router.post("/loginUser",
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password should be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ success: false, errors: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, userData.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, errors: "Invalid credentials" });
      }

      const data = {
        user: {
          id: userData.id
        }
      };

      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
