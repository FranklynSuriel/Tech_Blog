# Tech_Blog

![License](https://img.shields.io/badge/license-MIT-green)

## Description

A CMS-style blog where you can publish articles, blog post, comment other user post, update or delete your post and more

## Table of Contents

  - [Installation](#Installation)
  - [Usage](#Usage)
  - [License](#License)
  - [Contributions](#Contributions)
  - [Test](#Test)
  - [Questions](#Questions)

## Installation
 
This application requires the following packages:
- [nodejs](https://nodejs.org/en/)
- [MySQL2 package](https://www.npmjs.com/package/mysql2)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
- [eslint-config-wesbos](https://www.npmjs.com/package/eslint-config-wesbos)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-session](https://www.npmjs.com/package/express-session)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [nodemon](https://www.npmjs.com/package/nodemon)


## Usage

Deployed site here: [https://glacial-headland-83578.herokuapp.com/](https://glacial-headland-83578.herokuapp.com/home)

Introducing our new CMS-style blog site!

When you visit the site for the first time, you will be presented with our homepage which includes existing blog posts, navigation links for the homepage and dashboard, and the option to log in. If there are no existing blog posts, the homepage will be empty.

If you click on the homepage option, you will be taken to the homepage. If you click on any other links in the navigation, you will be prompted to either sign up or sign in.

To sign up, simply create a username and password. Once you click the sign-up button, your user credentials will be saved, and you will be logged into the site.

If you revisit the site at a later time and choose to log in, you will be prompted to enter your username and password. Once you are logged in, you will see navigation links for the homepage, the dashboard, and the option to log out.

Clicking on the homepage option in the navigation will take you to the homepage where you can see existing blog posts that include the post title and the date created. Clicking on an existing blog post will present you with the post title, contents, post creator’s username, and date created for that post, and you will have the option to leave a comment.

If you enter a comment and click on the submit button while signed in, the comment will be saved, and the post will be updated to display the comment, the comment creator’s username, and the date created.

Clicking on the dashboard option in the navigation will take you to the dashboard where you can see any blog posts you have already created and the option to add a new blog post. Clicking on the button to add a new blog post will prompt you to enter both a title and contents for your blog post. Once you click on the button to create a new blog post, the title and contents of your post will be saved, and you will be taken back to an updated dashboard with your new blog post.

If you click on one of your existing posts in the dashboard, you will be able to delete or update your post and taken back to an updated dashboard.

If you click on the logout option in the navigation, you will be signed out of the site. If you are idle on the site for more than a set time, you will still be able to view comments but will be prompted to log in again before you can add, update, or delete comments.

Enjoy using our CMS-style blog site and happy blogging!

![Tech Blog app](./public/images/Tech%20Blog%20app.jpg)


## Credits

Documentation(s) and webpage(s):

- Heroku
- W3 Schools
- mysql2
- express-handlebars
- express-session
- Stack Overflow

U. Penn Bootcamp instructor(s):

- Dan Gross
- Andrew Hojnowski

U. Penn Bootcamt student(s):

- Mia Ciasullo

Tutor(s):

- Ashton Foston
- Dennis Itua


## License

This project is licensed under the MIT license.

## Contributing

No contributions guidelines.

## Test

No test available.

## Questions

[github.com/FranklynSuriel](https://github.com/FranklynSuriel)

Questions about this project or to report an issue can be sent to:
fsuriel@gmail.com. Please specify the name of the project in the subject of the email.