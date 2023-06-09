const express = require('express');

const router = express.Router();

const auth = require('../../middleware/auth');

//bcrypt
const bcrypt = require('bcryptjs');

//Json Web Token
const jwt = require('jsonwebtoken');

//brings config
const config = require('config');

// Express validator
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth <- endpoint
// @desc    Test Route
// @access  Public (or private: You need to send a token to that route, in order for it to work.)
router.get('/', auth, async (req, res) => {
  try {
    //Returns a User. User is found by id from the middleware. Password not included
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth <- endpoint
// @desc    Authenticate user and get token
// @access  Public (or private: You need to send a token to that route, in order for it to work.)

// 2nd argument validates the req if the fields are invalid
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Errors are shown if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Sends an error in an array.
      return res.status(400).json({ errors: errors.array() });
    }

    //desctructures and pulls name, email, and password.
    const { email, password } = req.body;

    try {
      // See if user exists. if user exists send back an error
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Compares plaintext to the encrypted password
      const isMatch = await bcrypt.compare(password, user.password);

      // If password match is wrong, returns an error
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
