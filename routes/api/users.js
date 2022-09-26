const express = require('express');
const router  = express.Router();
// Express validator
const { check, validationResult } = require('express-validator');
//Use router to create a route

// @route   POST api/users <- endpoint
// @desc    Registers user
// @access  Public (or private: You need to send a token to that route, in order for it to work.)

// 2nd argument validates the req if the 
router.post('/', [
     check('name', 'Name is required').not().isEmpty(),
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        //
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route')
});

module.exports = router;