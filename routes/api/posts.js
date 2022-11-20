const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = required("../../models/Post");
const Profile = required("../../models/Profile");
const User = required("../../models/User");

//Use router to create a route

// @route   POST api/posts <- endpoint
// @desc    Create a post
// @access  Private (or private: You need to send a token to that route, in order for it to work.)
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPpst = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
