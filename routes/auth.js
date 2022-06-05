const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//Register

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
