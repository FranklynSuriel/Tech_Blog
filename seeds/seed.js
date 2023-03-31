// imports packages and models
const { sequelize } = require('../config/connections');
const { User, Post, Comments } = require('../models');

// import raw JSON files
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// seed tables
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,      
    });
  }

  process.exit(0);
};

seedDatabase();
