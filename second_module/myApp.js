let express = require('express');
let app = express();

console.log('Hello world')

app.get('/', function(req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
  });




































module.exports = app;