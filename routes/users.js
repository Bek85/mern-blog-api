const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
  try {
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
