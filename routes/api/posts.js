const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

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

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts <- endpoint
// @desc    Get all posts
// @access  Private (or private: You need to send a token to that route, in order for it to work.)

router.get("/", auth, async (req, res) => {
  try {
    //-1 finds the most recent date
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id <- endpoint
// @desc    Get post by id
// @access  Private (or private: You need to send a token to that route, in order for it to work.)

router.get("/:id", auth, async (req, res) => {
  try {
    //-1 finds the most recent date
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id <- endpoint
// @desc    Delete a post
// @access  Private (or private: You need to send a token to that route, in order for it to work.)

router.delete("/:id", auth, async (req, res) => {
  try {
    //-1 finds the most recent date
    const post = await Post.findById(req.params.id);

    //Check if the user deleting the post is the owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
