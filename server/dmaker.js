// back end for decision maker component
// search for user by username
// handle socket connections for multiplayer rock paper scissors

const path = require('path');
const express = require('express');
const { Users} = require('./database/index');
require('dotenv').config();

// const port = 4000; maybe change to 8080 when socket is used

const distPath = path.resolve(__dirname, '..', 'dist');


console.log(distPath);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

// get user by username
app.get('/user/:username', (req, res) =>{
  const { username } = req.params;

  Users.findOne({ where: {username: username}})
    .then((response) => {
      console.log('response:', response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('could not GET user by username:', err);
      res.sendStatus(500);
    });
});

