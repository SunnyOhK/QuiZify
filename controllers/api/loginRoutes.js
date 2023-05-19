// const router = require('express').Router();
// const { User } = require('../../models');
// const fs = require('fs');
// const path = require('path');

// // CREATE new user
// router.post('/', async (req, res) => {
//   try {
//     // Create a new user in the database
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     // Read the existing user data from the userData.json file
//     const filePath = path.join(seeds, 'userData.json');
//     const userData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//     // Add the newly registered user to the userData array
//     userData.push({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     // Write the updated user data back to the userData.json file
//     fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf8');

//     // Set up sessions with a 'loggedIn' variable set to `true`
//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     // Read the user data from the userData.json file
//     const filePath = path.join(__dirname, 'userData.json');
//     const userData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//     // Find the user with matching email and password
//     const dbUserData = userData.find(
//       (user) => user.email === req.body.email && user.password === req.body.password
//     );

//     if (!dbUserData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     // Once the user successfully logs in, set up the sessions variable 'loggedIn'
//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res
//         .status(200)
//         .json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Logout
// router.post('/logout', (req, res) => {
//   // When the user logs out, destroy the session
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;
const express = require('express');
const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;