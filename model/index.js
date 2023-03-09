// import models
const User = require('./user');
const Post = require('./post');
const Comments = require('./comments');

// comments belongs to user
Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
// post belongs to user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// post has many comments
Post.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: CASCADE
});

// export modules
module.exports = {
  User,
  Post,
  Comments
};
