require('dotenv').config();
require('./auth/passport');
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const users = require('./routes/users');
// passport starategy
const messageRouter = require('./routes/messagesHandling');
const wofRouter = require('./routes/wofRoutes.js');
const dmakerRouter = require('./routes/dmakerRouter'); //samson's route
const homeRouter = require('./routes/homeRouter');


const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');

console.log(distPath);

//generate secret key
const app = express();
const uuid = require('uuid');
const secretKey = uuid.v4();

// test server setup for sockets
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
// users session
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/users', users);
app.use('/auth', authRoutes);
app.use('/wofRoutes', wofRouter);
app.use('/messagesHandling', messageRouter);

// app.get('/favicon.ico', (req, res) => {
//   res.status(204).end(); // respond with a 204 No Content status code
// });

app.use('/', homeRouter);

// fill out routes
app.use('/decisionmaker', dmakerRouter);

// decision maker sockets

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('hand', (data) => {
    //console.log(data);
    socket.to(data.room).emit('receive_hand', data);
  });

  // socket.on('checkResults', (data) => {
  //   console.log(data);
  // });
});



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
