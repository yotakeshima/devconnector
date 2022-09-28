const express = require('express');

//Use router to create a route
const router  = express.Router();

//gravatar
const gravatar = require('gravatar');

//bcrypt
const bcrypt = require('bcryptjs');

//Json Web Token
const jwt = require('jsonwebtoken');

//brings config
const config = require('config');

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

    //desctructures and pulls name, email, and password.
    const { name, email, password } = req.body;
    
    try{
    // See if user exists. if user exists send back an error
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
        } 

    // Get users gravatar
        
        const avatar = gravatar.url(email, { 
            s: '200',
            r: 'pg',
            d: 'mm'
         });
         user = new User({
            name,
            email,
            avatar,
            password
         });
    
         // Encrypt password
    
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
 
        //saves user to database
        await user.save();

        // Return jsonwebtoken
         const payload = {
            user: {
                id: user.id
            }
         }

         jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

        } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;