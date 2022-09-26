const express = require('express');

const router  = express.Router();
//Use router to create a route

// @route   GET api/profile <- endpoint
// @desc    Test route
// @access  Public (or private: You need to send a token to that route, in order for it to work.)
router.get('/',  (req, res) => res.send('Profile route'));

module.exports = router;