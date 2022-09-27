const express = require('express');

const router  = express.Router();

const auth = require('../../middleware/auth');
//Use router to create a route

const User = require('../../models/User')

// @route   GET api/auth <- endpoint
// @desc    Test route
// @access  Public (or private: You need to send a token to that route, in order for it to work.)
router.get('/', auth,  async (req, res) => {
    try{
        //Returns a User. User is found by id from the middleware. Password not included
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});

module.exports = router;