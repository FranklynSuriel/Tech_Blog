const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

module.exports = router;
