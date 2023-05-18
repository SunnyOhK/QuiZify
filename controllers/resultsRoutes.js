router.get('/score', async (req, res) => {
  try {
    res.redirect('/score');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding up your points');
  }
});