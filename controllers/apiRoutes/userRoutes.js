// import packages
const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/login', async (req, res) => {
    try {
        // find the user that matches the email
        const userData = await User.findOne({ where: { email: req.body.email } });
        // if not found send and error
        if (!userData) {
            res.status(400).json({ message: 'Invalid username or password, please try again' });
            return;
        }

        // confirm the the password is valid
        const isValidPassword = await userData.comparePassword(req.body.password);
        // if password is not valid send an error
        if (!isValidPassword) {
            res.status(404).json({ message: 'Invalid username or password' });
            return;
        }
        console.log(userData)
        // save the session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            console.log(req.session.loggedIn)
            res.status(201).json({ userData, message: 'Logged in' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        // create a new user
        const userData = await User.create(req.body);
        console.log(userData)
        // save the session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            console.log(req.session.loggedIn)

            res.status(201).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    // check if user is logged in, if true then end the session
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
        // create a new post and add the user_id
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
        // create a new comment and add user id and post id
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
        // delete a post that matches post id
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        // if post id does not exist send and error message
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
        // update a post that matches post id
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
