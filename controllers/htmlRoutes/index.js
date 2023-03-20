const router = require('express').Router();
const { User, Post, Comments } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const showAllPost = await Post.findAll({
      attributes: ['id', 'title', 'content', 'createdAt'],
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });

    if (!showAllPost) {
      res.status(400).json({ message: "No post available" })
    };

    const postData = showAllPost.map((post) => {
      return post.get({plain: true})
    });
    
    res.render('home', {
      postData,
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id,
      postReader: req.session.username
    });
  } catch(err) {
    res.status(500).json(err)
  }
  
});
router.get('/home', async (req, res) => {
  res.redirect('/');
});

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard')
    return;
  }
  res.redirect('/login');
})

module.exports = router;
