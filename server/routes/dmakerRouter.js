// back end for decision maker component
// search for user by username
// handle socket connections for multiplayer rock paper scissors (MAYBE?)

const express = require('express');
const { Users} = require('../database/index');
const dmakerRouter = express.Router();

// get user by username
dmakerRouter.get('/user/:username', (req, res) =>{
  const { username } = req.params;

  Users.findOne({ where: {username: username}})
    .then((response) => {
      //console.log('response:', response);
      if (response === null) {
        console.log('username does not exist');
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error('could not GET user by username:', err);
      res.sendStatus(500);
    });
});


module.exports = dmakerRouter;
