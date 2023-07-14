const path = require('path');
const express = require('express');
const { Users, Messages, Void } = require('../database/index');

const port = 4000;

const distPath = path.resolve(__dirname, '..', '..', 'dist');


console.log(distPath);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

// fill out routes

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}  ${distPath}`);
});



