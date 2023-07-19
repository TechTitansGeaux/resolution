const express = require('express');
const path = require('path');
const app = express();
// test server setup for sockets
const port = 8080;

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const dmakerRouter = require('./dmakerRouter');
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
app.use('/decisionmaker', dmakerRouter);

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('hand', (data) => {
    console.log(data);
    socket.broadcast.emit('receive_hand', data);
  });
});

server.listen(port, () => {
  console.log(`RPS Server listening at http://localhost:${port}`);
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// app.listen(port, () => {
//   console.log(`RPS Server listening at http://127.0.0.1:${port}`);
// });

