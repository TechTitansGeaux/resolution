// back end for decision maker component
// search for user by username
// handle socket connections for multiplayer rock paper scissors

const path = require('path');
const express = require('express');
const { Users} = require('./database/index');
require('dotenv').config();

const port = 8080;//maybe change to 8080 when socket is used

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
      //console.log('response:', response);
      if (response === null) {
        console.log('username does not exist');
        res.sendStatus(404);
      }
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('could not GET user by username:', err);
      res.sendStatus(500);
    });
});


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
