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
      // post_id: comment[Math.floor(Math.random() * comment.length)].id,
    });
  }

  // await userData.forEach((user) => {
  //   sequelize.sync({ force: true });
  //   const users = User.create(user, {
  //     individualHooks: true,
  //     returning: true,
  //   });
  // });
  // await postData.forEach((post) => {
  //   sequelize.sync({ force: true });
  //   const posts = Post.create(post, {
  //     individualHooks: true,
  //     returning: true,
  //   });
  // });
  // await commentData.forEach((comment) => {
  //   sequelize.sync({ force: true });
  //   const comments = Comments.create(comment, {
  //     individualHooks: true,
  //     returning: true,
  //   });
  // });

  process.exit(0);
};

seedDatabase();
