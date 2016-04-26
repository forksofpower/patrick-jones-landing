'use strict';

var express = require('express'),
    path = require('path'),
    app = express();

var data = require('./data/db.json');
var resume = require('./data/resume.json');
var port = process.env.APP_PORT || 3003;

app.use('/public', express.static(__dirname + '/assets'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  return res.status(200).render('index', data);
});

app.get('/clients', function (req, res) {
  return res.status(200).render('clients', data);
});

app.get('/resume', function (req, res) {
  return res.status(200).json(resume);
});

app.get('/resume/:items', function (req, res, next) {
  if (req.items) {
    // if (resume[req.items] != null) {
    var items = req.items.replace('+', '.');
    // replace with regex to remove trailing or multiple symbols
    if (items[items.length - 1] === '+') {
      items = items.substring(0, items.length - 1);
    }
    res.status(200).send(resume.getByPath(items));
  } else {
    req.status(200).json(resume);
  }
});

app.param('items', function (req, res, next, itemName) {
  req.items = itemName;
  next();
});

// Listen to the music...
app.listen(port, function () {
  return console.log('Application is running on port ' + port);
});

// object.getByPath("item.subItem.subItem") -> object.subItem.subItem
Object.prototype.getByPath = function (key) {
  var keys = key.split('.'),
      obj = this;
  // console.log(keys)
  for (var i = 0; i < keys.length; i++) {
    obj = obj[keys[i]];
  }
  return obj;
};