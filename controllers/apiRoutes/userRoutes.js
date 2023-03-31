// import packages
const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Invalid username or password, please try again' });
        }

        const isValidPassword = await userData.comparePassword(req.body.password);
        if (!isValidPassword) {
            res.status(404).json({ message: 'Invalid username or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            // req.session.username = userData.name
            req.session.loggedIn = true;
            // loggedIn = req.session.loggedIn
            res.json({ userData, message: 'Logged in' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        // const plainUser = userData.get({ plain: true });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
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

router.post('/dashboard', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comment', async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.session)
        const comment = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.session.post_id
        });

        res.status(200).json(comment);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        },
        {
            where: {
                id: req.params.id,
            }
        });

        res.status(200).json(postData)
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
