const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const newUser = await User.create({ name, email, password });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json({ user: newUser, message: 'You are now signed up!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

router.get('/', (req, res) => {
  res.send('GET /signup');
});

module.exports = router;
