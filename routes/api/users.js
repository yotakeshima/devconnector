const express = require('express');

//Use router to create a route
const router  = express.Router();

// Express validator
const { check, validationResult } = require('express-validator');

// User Model
const User = require('../../models/User');


// @route   POST api/users <- endpoint
// @desc    Registers user
// @access  Public (or private: You need to send a token to that route, in order for it to work.)

// 2nd argument validates the req if the fields are invalid 
router.post('/', [
     check('name', 'Name is required').not().isEmpty(),
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
async (req, res) => {
    // Errors are shown if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        // Sends an error in an array.
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    
    try{
    // See if user exists. if user exists send back an error
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
        } 

    // Get users gravatar
    
    // Encrypt password
    
    // Return jsonwebtoken
    res.send('User route');

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;