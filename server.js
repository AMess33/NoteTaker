const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

// get request for the index.html page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);