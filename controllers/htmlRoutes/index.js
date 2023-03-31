const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const { create } = require('../../models/user');
const withAuth = require('../../utils/auth');

router.get('/home', async (req, res) => {
  try {
    const showAllPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!showAllPost) {
      res.status(400).json({ message: "No post available" })
    };

    const postData = showAllPost.map((post) => post.get({ plain: true }));
    
    console.log(req.session.loggedIn)
    res.render('home', {
      postData,
      loggedIn: req.session.loggedIn
    });
    // } 
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/', async (req, res) => {
  res.redirect('/home');
});

router.get('/logout', async (req, res) => {
  res.redirect('/home');
});

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log(req.session.userId)
    const showUserPost = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!showUserPost) {
      res.status(400).json({ message: "No post available" })
    };

    const postData = showUserPost.map((post) => post.get({ plain: true }));

    console.log(postData)
    res.render('dashboard', {
      postData,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "dashboard error" });
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comments,
          include: [{ model: User, attributes: ['username'] }]
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post)
    req.session.post_id = post.id
    res.render('Post', {
      ...post,
      loggedIn: req.session.loggedIn,
      post_id: req.session.post_id,
      post_comments: post.comments
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comments,
          include: [{ model: User, attributes: ['username'] }]
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post)
    req.session.post_id = post.id
    res.render('dashboardPost', {
      ...post,
      loggedIn: req.session.loggedIn,
      post_id: req.session.post_id,
      post_comments: post.comments
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
