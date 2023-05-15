const router = require('express').Router();

router.get('/', (req, res) => {
  const authorizeUrl = 'https://connect.deezer.com/oauth/auth.php';
  const clientId = process.env.DEEZER_CLIENT_ID;
  const redirectUri = 'http://localhost:3001/auth/deezer/callback';
  const scope = 'basic_access,email';

  const url = `${authorizeUrl}?app_id=${clientId}&redirect_uri=${redirectUri}&perms=${scope}`;
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const tokenUrl = 'https://connect.deezer.com/oauth/access_token.php';
  const clientId = process.env.DEEZER_CLIENT_ID;
  const clientSecret = process.env.DEEZER_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3001/auth/deezer/callback';

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `app_id=${clientId}&secret=${clientSecret}&code=${code}&output=json&redirect_uri=${redirectUri}`,
    });

    const responseBody = await response.text();
    console.log(responseBody);

    const responseParams = new URLSearchParams(responseBody);
    const access_token = responseParams.get('access_token');

    req.session.accessToken = access_token;
    res.redirect('/?loggedIn=true');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



module.exports = router;