const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const { create } = require('../../models/user');
const withAuth = require('../../utils/auth');

router.get('/home', async (req, res) => {
  try {
    // get all posts and JOIN with user data
    const showAllPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // check if missing username or password
    if (!showAllPost) {
      res.status(400).json({ message: "No post available" })
    };

    // serialize data so the template can read it
    const postData = showAllPost.map((post) => post.get({ plain: true }));
    
    // pass serialized data and session flag into template
    res.render('home', {
      postData,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
    // } 
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/', async (req, res) => {
  // redirect to home
  res.redirect('/home');
});

router.get('/logout', async (req, res) => {
  // redirect to home
  res.redirect('/home');
});

router.get('/login', async (req, res) => {
  // check is user is logged in
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // find all post where user id match and JOIN the user data
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
      return;
    };
    // Serialize data so the template can read it
    const postData = showUserPost.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      postData,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "dashboard error" });
  }
});

// router to find any post by id 
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // find the post that matches the id and JOIN user data and comment data
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
    // Serialize data so the template can read it
    const post = postData.get({ plain: true });
    
    // save the post.id
    req.session.post_id = post.id
    // Pass serialized data and session flag into template
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

// router to find user post by id
// it look similar to the previous route, but this route is exclusive to the logged in user
// this router is use to render dashboardPost.handlebars which allow the user to update or deleted the selected post
router.get('/dashboard/post/:id', withAuth, async (req, res) => {
  try {
    // find the post that matches the id and JOIN user data and comment data
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
    // Serialize data so the template can read it
    const post = postData.get({ plain: true });
    // save the post.id
    req.session.post_id = post.id
    // Pass serialized data and session flag into template
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
