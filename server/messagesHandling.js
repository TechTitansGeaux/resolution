const express = require('express');
const messageRouter = express.Router();
const { Users, Messages, Conversations } = require('./database/index');

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

messageRouter.get('/conversations:userId', (req, res) => {
  const { userId } = req.params;
});

messageRouter.post('/message', (req, res) => {
  const { senderId, recipientId, conversationId } = req.body;
  if (conversationId) {
    Messages.create(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error creating message: ', err);
        res.sendStatus(500);
      });
  } else {
    Conversations.create({userOneId: senderId, userTwoId: recipientId})
      .then((data) => {
        const { id } = data.dataValues;
        return Messages.create({ senderId, recipientId, conversationId: id });
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error creating message: ', err);
        res.sendStatus(500);
      });
  }

});

module.exports = messageRouter;
