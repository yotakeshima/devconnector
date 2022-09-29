const express = require('express');
const router  = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//Use router to create a route

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private (or private: You need to send a token to that route, in order for it to work.)
router.get('/me', auth, async (req, res) => {
    try{
        // Looks for an existing user ID for a profile
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;