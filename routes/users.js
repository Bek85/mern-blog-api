const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');

// Update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You can update only your account');
  }
});

// Delete user
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

//Get a particular user
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
