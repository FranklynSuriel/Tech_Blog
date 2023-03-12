// import packages
const router = require('express').Router();
const { User } = require('../../models');

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
  } else {
    res.status(404).end();
  }
});

module.exports = router;
