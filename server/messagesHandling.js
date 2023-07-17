const express = require('express');
const messageRouter = express.Router();

messageRouter.get('/test', (req, res) => {
  res.send('hello');
});

module.exports = messageRouter;
