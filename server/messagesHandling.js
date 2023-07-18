const express = require('express');
const messageRouter = express.Router();
const { Users, Messages } = require('./database/index');

messageRouter.get('/user:username', (req, res) => {
  const { username } = req.params;
  Users.findOne({ where: { username }})
    // data will either be an object or null
    .then((data) => {
      if (data) {
        res.send(data.dataValues);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log('error finding user by username: ', err);
      res.sendStatus(500);
    });
});

messageRouter.post('/message', (req, res) => {
  console.log(req.body);
  Messages.create(req.body)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('error creating message: ', err);
      res.sendStatus(500);
    });
});

module.exports = messageRouter;
