const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const users = require('./routes/users');
// passport starategy
require('./auth/passport');
const wofRouter = require('./wofRoutes.js');
require('dotenv').config();
const messageRouter = require('./messagesHandling');

const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');

console.log(distPath);

//generate secret key
const app = express();
const uuid = require('uuid');
const secretKey = uuid.v4();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
// users session
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRoutes);
app.use('/users', users);

app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // respond with a 204 No Content status code
});


app.use('/wofRoutes', wofRouter);

// sets endpoint (needs better name)
app.use('/messagesHandling', messageRouter);



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
