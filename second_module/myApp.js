let express = require('express');
let app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

console.log('Hello world')

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/name', function(req, res) {
  let first = req.body.first;
  let last = req.body.last;
  res.json({name: `${first} ${last}`});
});

app.use(function(req, res, next) {
  let method = req.method;
  let path = req.path;
  let ip = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
})

app.get('/', function(req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
  });

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', function(req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase"){
    message = message.toUpperCase();
  }
  res.json({message: message});
})

app.get('/now', function(req, res, next) {  
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
})

app.get('/:word/echo', function(req, res) {
  reqword = req.params.word;
  res.json({echo: reqword});
});

app.get('/name/', function(req, res) {
  let first = req.query.first;
  let last = req.query.last;
  res.json({name: `${first} ${last}`});
});

module.exports = app;