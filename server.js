const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const routes = require('./controllers');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(
  session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
  })
);

//handlebars
app.set('view engine', 'hbs');

// serve static files from public directory
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);

