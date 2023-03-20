// import packages
const router = require('express').Router();
const { User, Post } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUser) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await dbUser.comparePassword(req.body.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      return res.status(200).json({ message: 'Logged in' });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Something went wrong, please try again' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const dbUser = await User.create(req.body);
    const plainUser = dbUser.get({ plain: true });

    if (!dbUser) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(201).json({ plainUser });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
  
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    // res.redirect('/');
  } else {
    res.status(404).end();
  }
});

router.post('/dashboard', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
