// import packages
const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: 'Invalid username or password, please try again' });
        }

        const isValidPassword = await userData.comparePassword(req.body.password);
        if (!isValidPassword) {
            res.status(404).json({ message: 'Invalid username or password' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id
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



module.exports = router;
