const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Create a new post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Update a post

// Delete a post
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.body.userId);
        res.status(200).json('User has been deleted');
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json('User not found');
    }
  } else {
    res.status(401).json('You can delete only your account');
  }
});

//Get a particular post
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otherCredentials } = user._doc;
    res.status(200).json(otherCredentials);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
